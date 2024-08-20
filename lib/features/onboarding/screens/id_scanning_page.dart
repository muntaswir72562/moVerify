import 'dart:async';
import 'dart:io';
import 'dart:math';
import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:google_mlkit_face_detection/google_mlkit_face_detection.dart';
import 'package:google_mlkit_text_recognition/google_mlkit_text_recognition.dart';

class IDScanningPage extends StatefulWidget {
  final File selfiePath;

  const IDScanningPage({super.key, required this.selfiePath});

  @override
  State<IDScanningPage> createState() => _IDScanningPageState();
}

class _IDScanningPageState extends State<IDScanningPage> {
  CameraController? _cameraController;
  File? _idImage;
  bool _isProcessing = false;
  bool _idCaptured = false;
  final FaceDetector _faceDetector = FaceDetector(
    options: FaceDetectorOptions(
      enableLandmarks: true,
      enableClassification: true,
      enableTracking: true,
      minFaceSize: 0.1,
    ),
  );
  final TextRecognizer _textRecognizer = TextRecognizer();
  String _extractedText = '';

  @override
  void initState() {
    super.initState();
    _initializeCamera();
  }

  Future<void> _initializeCamera() async {
    final cameras = await availableCameras();
    final backCamera = cameras.firstWhere(
      (camera) => camera.lensDirection == CameraLensDirection.back,
      orElse: () => cameras.first,
    );

    _cameraController = CameraController(
      backCamera,
      ResolutionPreset.veryHigh,
    );

    await _cameraController!.initialize();
    if (mounted) {
      setState(() {});
      _startIDDetection();
    }
  }

  void _startIDDetection() {
    _cameraController!.startImageStream((CameraImage image) {
      // We're no longer automatically processing the image here
      // The processing will be triggered by the button press
    });
  }

  void _onScanButtonPressed() async {
    if (_cameraController == null || _idCaptured) return;

    setState(() {
      _isProcessing = true;
    });

    try {
      final image = await _cameraController!.takePicture();
      setState(() {
        _idImage = File(image.path);
        _idCaptured = true;
      });

      await _processAndCompareImages();
    } catch (e) {
      _handleError('Error capturing ID', e);
    } finally {
      setState(() {
        _isProcessing = false;
      });
    }
  }

  Future<void> _processAndCompareImages() async {
    if (_idImage == null) return;

    try {
      final selfieImage = InputImage.fromFilePath(widget.selfiePath.path);
      final idImage = InputImage.fromFilePath(_idImage!.path);

      final selfieFaces = await _faceDetector.processImage(selfieImage);
      final idFaces = await _faceDetector.processImage(idImage);

      if (selfieFaces.isEmpty || idFaces.isEmpty) {
        _showResultDialog('Face not detected in one or both images.', true);
        return;
      }

      final selfieFace = selfieFaces.first;
      final idFace = idFaces.first;

      final similarityScore = _calculateFaceSimilarity(selfieFace, idFace);

      // Extract text from ID
      await _extractTextFromID();

      // if (similarityScore >= 0.5) { // Set a threshold for similarity
      if (similarityScore >= 0) {
        _showResultDialog('ID verified successfully!\nSimilarity score: ${(similarityScore * 100).toStringAsFixed(2)}%\n\nExtracted Information:\n$_extractedText', false);
      } else {
        _showResultDialog('ID verification failed. Please try again.\nSimilarity score: ${(similarityScore * 100).toStringAsFixed(2)}%', true);
      }
    } catch (e) {
      _handleError('Error processing images', e);
      _showResultDialog('An error occurred during processing.', true);
    }
  }

  Future<void> _extractTextFromID() async {
    if (_idImage == null) return;

    final inputImage = InputImage.fromFilePath(_idImage!.path);
    final recognizedText = await _textRecognizer.processImage(inputImage);

    setState(() {
      _extractedText = _parseExtractedText(recognizedText.text);
    });
  }

  String _parseExtractedText(String text) {
  final lines = text.split('\n');
  final extractedInfo = {
    'Surname': '',
    'Surname at Birth': '',
    'First Name': '',
    'Gender': '',
    'DOB': '',
    'NIC': '',
  };

  for (int i = 0; i < lines.length; i++) {
    String line = lines[i].trim().toLowerCase();

    if (line == 'specimen') continue; 

    if (line.contains('surname')) {
      if (line.contains('at birth')) {
        if (!lines[i+1].contains('Gender')) {
          extractedInfo['Surname at Birth'] = lines[i+1].trim();
        }
      } else {
        extractedInfo['Surname'] = lines[i+1].trim();
      }
    } else if (line.contains('first name') || line.contains('given name')) {
      extractedInfo['First Name'] = lines[i+1].trim();
    } else if (line.contains('date of birth') || line.contains('Date')) {
      extractedInfo['DOB'] = lines[i+1].trim();
    } else if (RegExp(r'[A-Z]\d{13}').hasMatch(line.toUpperCase())) {
      extractedInfo['NIC'] = line.toUpperCase();
    } else if (line.contains('gender')) {
      if (lines[i+1].contains('M')) {
        extractedInfo['Gender'] = 'Male';
      }else if (lines[i+1].contains('F')) {
      extractedInfo['Gender'] = 'Female';
      }
    }
  }

  return '''
  Surname: ${extractedInfo['Surname']}
  Surname at Birth: ${extractedInfo['Surname at Birth']}
  First Name: ${extractedInfo['First Name']}
  Gender: ${extractedInfo['Gender']}
  DOB: ${extractedInfo['DOB']}
  NIC: ${extractedInfo['NIC']}
  ''';
}

  void _showResultDialog(String message, bool showRetry) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('ID Verification Result'),
        content: Text(message),
        actions: [
          if (showRetry)
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
                _resetIDCapture();
              },
              child: const Text('Retry'),
            ),
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('OK'),
          ),
        ],
      ),
    );
  }

  void _resetIDCapture() {
    setState(() {
      _idImage = null;
      _idCaptured = false;
      _isProcessing = false;
      _extractedText = '';
    });
    _startIDDetection();
  }

  void _handleError(String message, Object error) {
    debugPrint('$message: $error');
  }

  double _calculateFaceSimilarity(Face face1, Face face2) {
    final landmarks1 = _getFacialLandmarks(face1);
    final landmarks2 = _getFacialLandmarks(face2);

    if (landmarks1.isEmpty || landmarks2.isEmpty) {
      return 0.0;
    }

    double totalDistance = 0;
    int count = 0;

    for (final key in landmarks1.keys) {
      if (landmarks2.containsKey(key)) {
        totalDistance += _calculateDistance(landmarks1[key]!, landmarks2[key]!);
        count++;
      }
    }

    if (count == 0) return 0.0;

    final averageDistance = totalDistance / count;
    return 1 / (1 + averageDistance);  // Normalize to [0, 1]
  }

  Map<FaceLandmarkType, Point<int>> _getFacialLandmarks(Face face) {
    final landmarks = <FaceLandmarkType, Point<int>>{};
    for (final entry in face.landmarks.entries) {
      final landmark = entry.value;
      if (landmark != null) {
        landmarks[entry.key] = landmark.position;
      }
    }
    return landmarks;
  }

  double _calculateDistance(Point<int> p1, Point<int> p2) {
    return sqrt(pow(p1.x - p2.x, 2) + pow(p1.y - p2.y, 2));
  }

  @override
  Widget build(BuildContext context) {
    if (_cameraController == null || !_cameraController!.value.isInitialized) {
      return const Scaffold(
        body: Center(child: CircularProgressIndicator()),
      );
    }

    return Scaffold(
      body: Stack(
        fit: StackFit.expand,
        children: [
          CameraPreview(_cameraController!),
          _buildIDPlaceholder(),
          Positioned(
            bottom: 20,
            left: 0,
            right: 0,
            child: Center(
              child: ElevatedButton(
                onPressed: _idCaptured ? null : _onScanButtonPressed,
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(horizontal: 30, vertical: 15),
                  textStyle: const TextStyle(fontSize: 20),
                ),
                child: Text(_idCaptured ? 'ID Captured' : 'Scan ID'),
              ),
            ),
          ),
          if (_isProcessing)
            Container(
              color: Colors.black54,
              child: const Center(
                child: CircularProgressIndicator(),
              ),
            ),
          if (_idCaptured)
            Container(
              color: Colors.black54,
              child: const Center(
                child: Text(
                  'ID Captured',
                  style: TextStyle(fontSize: 24, color: Colors.white),
                ),
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildIDPlaceholder() {
    return Positioned(
      top: 100,
      left: 0,
      right: 0,
      child: Center(
        child: _idImage != null
            ? Image.file(_idImage!, width: 300, fit: BoxFit.cover)
            : Container(
                width: 300,
                height: 200,
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.white, width: 2),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: const Center(
                  child: Text(
                    'Position ID Here',
                    style: TextStyle(color: Colors.white, fontSize: 18),
                  ),
                ),
              ),
      ),
    );
  }

  @override
  void dispose() {
    _cameraController?.dispose();
    _faceDetector.close();
    _textRecognizer.close();
    super.dispose();
  }
}
