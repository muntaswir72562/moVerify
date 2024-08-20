import 'dart:async';
import 'dart:typed_data';
import 'dart:io';
import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:google_mlkit_face_detection/google_mlkit_face_detection.dart';
import 'package:moverify/features/onboarding/screens/upload_documents.dart';

class LivenessDetectionPage extends StatefulWidget {
  const LivenessDetectionPage({super.key});

  @override
  State<LivenessDetectionPage> createState() => _LivenessDetectionPageState();
}

class _LivenessDetectionPageState extends State<LivenessDetectionPage> with SingleTickerProviderStateMixin {
  CameraController? _cameraController;
  FaceDetector? _faceDetector;
  bool _isDetecting = false;
  String _instruction = "Place your face in the circle";
  final List<String> _challenges = ['Nod', 'Smile', 'Turn Left', 'Turn Right'];
  String _currentChallenge = '';
  int _challengeIndex = -1;
  Timer? _challengeTimer;
  int _timeRemaining = 10;
  late AnimationController _animationController;
  late Animation<double> _animation;
  double _progress = 0.0;
  double? _lastPitchAngle;
  int _nodCount = 0;
  bool _isNoddingUp = false;
  bool _faceDetected = false;
  bool _selfieCapturing = false;
  File? _selfieImage;

  @override
  void initState() {
    super.initState();
    _initializeCamera();
    _faceDetector = FaceDetector(
      options: FaceDetectorOptions(
        enableClassification: true,
        minFaceSize: 0.1,
      ),
    );
    _animationController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 10),
    );
    _animation = Tween<double>(begin: 0, end: 1).animate(_animationController)
      ..addListener(() {
        setState(() {});
      });
  }

  Future<void> _initializeCamera() async {
    final cameras = await availableCameras();
    final frontCamera = cameras.firstWhere(
      (camera) => camera.lensDirection == CameraLensDirection.front,
      orElse: () => cameras.first,
    );

    _cameraController = CameraController(
      frontCamera,
      ResolutionPreset.medium,
      imageFormatGroup: ImageFormatGroup.yuv420,
    );

    await _cameraController!.initialize();
    if (!mounted) return;

    _cameraController!.startImageStream(_processCameraImage);
    setState(() {});
  }

  void _startNextChallenge() {
    _challengeIndex++;
    if (_challengeIndex >= _challenges.length) {
      setState(() {
        _instruction = "Liveness check passed!";
        _progress = 1.0;
      });
      _navigateToDocumentUpload();
      return;
    }

    _currentChallenge = _challenges[_challengeIndex];
    _timeRemaining = 10;
    _animationController.reset();
    _animationController.forward();

    setState(() {
      _instruction = "Please $_currentChallenge";
    });

    _challengeTimer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_timeRemaining > 0) {
        setState(() {
          _timeRemaining--;
        });
      } else {
        _failChallenge();
      }
    });

    _nodCount = 0;
    _isNoddingUp = false;
    _lastPitchAngle = null;
  }

  void _failChallenge() {
    _challengeTimer?.cancel();
    _animationController.stop();
    setState(() {
      _instruction = "Challenge failed. Please try again.";
    });
    Future.delayed(const Duration(seconds: 2), () {
      _startNextChallenge();
    });
  }

  void _completeChallenge() {
    _challengeTimer?.cancel();
    _animationController.stop();
    setState(() {
      _progress = (_challengeIndex + 1) / _challenges.length;
    });
    _startNextChallenge();
  }

  void _navigateToDocumentUpload() {
    if (!mounted) return;
    Navigator.of(context).push(MaterialPageRoute(
      builder: (context) => UploadDocumentScreen(selfiePath: _selfieImage!),
    ));
  }

  Future<void> _processCameraImage(CameraImage image) async {
    if (_isDetecting) return;
    _isDetecting = true;

    try {
      final inputImage = await _convertCameraImageToInputImage(image);
      if (inputImage == null) {
        _isDetecting = false;
        return;
      }

      final faces = await _faceDetector!.processImage(inputImage);

      if (faces.isNotEmpty) {
        if (!_faceDetected) {
          setState(() {
            _faceDetected = true;
            _instruction = "Hold still";
          });
          _captureSelfie();
        } else if (_selfieImage != null && _challengeIndex == -1) {
          _startNextChallenge();
        } else {
          _checkChallenge(faces.first);
        }
      }
    } catch (e) {
      debugPrint('Error processing image: $e');
    } finally {
      _isDetecting = false;
    }
  }

  Future<void> _captureSelfie() async {
    if (_selfieCapturing) return;
    _selfieCapturing = true;

    await Future.delayed(const Duration(seconds: 1));  // Brief delay for "Hold still"

    try {
      final XFile selfie = await _cameraController!.takePicture();
      setState(() {
        _selfieImage = File(selfie.path);
        _instruction = "Selfie captured. Preparing challenges...";
      });
      await Future.delayed(const Duration(seconds: 1));  // Brief delay before starting challenges
    } catch (e) {
      debugPrint('Error capturing selfie: $e');
      setState(() {
        _instruction = "Failed to capture selfie. Please try again.";
        _faceDetected = false;
      });
    } finally {
      _selfieCapturing = false;
    }
  }

  Future<InputImage?> _convertCameraImageToInputImage(CameraImage image) async {
    final allBytes = image.planes.fold<List<int>>([], (previousValue, plane) {
      previousValue.addAll(plane.bytes);
      return previousValue;
    });
    final bytes = Uint8List.fromList(allBytes);

    final imageSize = Size(image.width.toDouble(), image.height.toDouble());

    const imageRotation = InputImageRotation.rotation0deg;
    final inputImageFormat = InputImageFormatValue.fromRawValue(image.format.raw) ?? InputImageFormat.nv21;

    final inputImageData = InputImageMetadata(
      size: imageSize,
      rotation: imageRotation,
      format: inputImageFormat,
      bytesPerRow: image.planes[0].bytesPerRow,
    );

    return InputImage.fromBytes(bytes: bytes, metadata: inputImageData);
  }

  void _checkChallenge(Face face) {
    switch (_currentChallenge) {
      case 'Nod':
        if (face.headEulerAngleX != null) {
          final currentPitchAngle = face.headEulerAngleX!;
          if (_lastPitchAngle != null) {
            final pitchDifference = currentPitchAngle - _lastPitchAngle!;
            
            if (pitchDifference > 5 && !_isNoddingUp) {
              _isNoddingUp = true;
              _nodCount++;
            } else if (pitchDifference < -5 && _isNoddingUp) {
              _isNoddingUp = false;
              _nodCount++;
            }

            if (_nodCount >= 4) {
              _completeChallenge();
            }
          }
          _lastPitchAngle = currentPitchAngle;
        }
        break;
      case 'Smile':
        if (face.smilingProbability != null && face.smilingProbability! > 0.8) {
          _completeChallenge();
        }
        break;
      case 'Turn Left':
        if (face.headEulerAngleY != null && face.headEulerAngleY! < -30) {
          _completeChallenge();
        }
        break;
      case 'Turn Right':
        if (face.headEulerAngleY != null && face.headEulerAngleY! > 30) {
          _completeChallenge();
        }
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_cameraController == null || !_cameraController!.value.isInitialized) {
      return const Scaffold(
        body: Center(child: CircularProgressIndicator()),
      );
    }
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Expanded(
              child: LayoutBuilder(
                builder: (context, constraints) {
                  final size = constraints.maxWidth < constraints.maxHeight
                      ? constraints.maxWidth
                      : constraints.maxHeight;
                  return Stack(
                    alignment: Alignment.center,
                    children: [
                      Center(
                        child: ClipOval(
                          child: SizedBox(
                            width: size * 0.8,
                            height: size * 0.8,
                            child: Transform.scale(
                              scale: _cameraController!.value.aspectRatio,
                              child: Center(
                                child: AspectRatio(
                                  aspectRatio: 1 / _cameraController!.value.aspectRatio,
                                  child: CameraPreview(_cameraController!),
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                      Center(
                        child: SizedBox(
                          width: size * 0.85,
                          height: size * 0.85,
                          child: CircularProgressIndicator(
                            value: _progress,
                            strokeWidth: 5,
                            valueColor: const AlwaysStoppedAnimation<Color>(Colors.blue),
                          ),
                        ),
                      ),
                    ],
                  );
                },
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(20),
              child: Text(
                _instruction,
                style: const TextStyle(
                  color: Colors.black,
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
                textAlign: TextAlign.center,
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  void dispose() {
    _cameraController?.dispose();
    _faceDetector?.close();
    _challengeTimer?.cancel();
    _animationController.dispose();
    super.dispose();
  }
}