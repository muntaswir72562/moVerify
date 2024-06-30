import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import * as tf from '@tensorflow/tfjs';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import Svg, { Circle, Line } from 'react-native-svg';

const TensorCamera = cameraWithTensors(Camera as any);
const { width, height } = Dimensions.get('window');

const DIRECTIONS = ['left', 'right', 'up', 'down'] as const;
type Direction = typeof DIRECTIONS[number];
const SEQUENCE_LENGTH = 5;
const MOVEMENT_THRESHOLD = 10;
const TIMEOUT_DURATION = 5000; // 5 seconds

const LivenessDetection = () => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [model, setModel] = useState<faceLandmarksDetection.FaceLandmarksDetector | null>(null);
    const [currentDirection, setCurrentDirection] = useState<Direction | null>(null);
    const [isCorrectMovement, setIsCorrectMovement] = useState(false);
    const [sequence, setSequence] = useState<Direction[]>([]);
    const [sequenceIndex, setSequenceIndex] = useState(0);
    const [livenessCheckComplete, setLivenessCheckComplete] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const cameraRef = useRef<any>(null);
    const previousLandmarksRef = useRef<faceLandmarksDetection.Keypoint[] | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');

            await tf.ready();

            // Update: Load the face landmarks detection model
            const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
            const detectorConfig: faceLandmarksDetection.MediaPipeFaceMeshTfjsModelConfig = {
                runtime: 'tfjs',
                refineLandmarks: true,
                maxFaces: 1,
                // shouldLoadIrisModel: false,
            };

            const detector = await faceLandmarksDetection.createDetector(model, detectorConfig);
            setModel(detector);

            generateSequence();
        })();

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const generateSequence = () => {
        const newSequence: Direction[] = Array.from(
            { length: SEQUENCE_LENGTH },
            () => DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)]
        );
        setSequence(newSequence);
        setSequenceIndex(0);
        setCurrentDirection(newSequence[0]);
        setLivenessCheckComplete(false);
        startTimer();
    };

    const startTimer = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setError('Timeout: Movement not detected. Please try again.');
            generateSequence();
        }, TIMEOUT_DURATION);
    };

    const handleCameraStream = (images: any) => {
        const loop = async () => {
            const nextImageTensor = images.next().value;
            if (nextImageTensor && model && !livenessCheckComplete) {
                const faces = await model.estimateFaces(nextImageTensor, {
                    flipHorizontal: false,
                    staticImageMode: false,
                });

                if (faces.length > 0) {
                    const currentLandmarks = faces[0].keypoints;

                    if (previousLandmarksRef.current) {
                        const movement = detectMovement(previousLandmarksRef.current, currentLandmarks);

                        if (movement === currentDirection) {
                            setIsCorrectMovement(true);
                            moveToNextDirection();
                        }
                    }

                    previousLandmarksRef.current = currentLandmarks;
                }
            }
            requestAnimationFrame(loop);
        };
        loop();
    };

    const detectMovement = (prevLandmarks: faceLandmarksDetection.Keypoint[], currentLandmarks: faceLandmarksDetection.Keypoint[]): Direction | null => {
        // Find the nose keypoint
        const prevNose = prevLandmarks.find(kp => kp.name === 'nose');
        const currentNose = currentLandmarks.find(kp => kp.name === 'nose');

        if (prevNose && currentNose) {
            const dx = currentNose.x - prevNose.x;
            const dy = currentNose.y - prevNose.y;

            if (Math.abs(dx) > MOVEMENT_THRESHOLD || Math.abs(dy) > MOVEMENT_THRESHOLD) {
                if (Math.abs(dx) > Math.abs(dy)) {
                    return dx > 0 ? 'right' : 'left';
                } else {
                    return dy > 0 ? 'down' : 'up';
                }
            }
        }
        return null;
    };

    const moveToNextDirection = () => {
        if (sequenceIndex < SEQUENCE_LENGTH - 1) {
            setSequenceIndex(prevIndex => prevIndex + 1);
            setCurrentDirection(sequence[sequenceIndex + 1]);
            setIsCorrectMovement(false);
            startTimer();
        } else {
            setLivenessCheckComplete(true);
            setError(null);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }
    };

    if (hasPermission === null) return <View />;
    if (hasPermission === false) return <Text>No access to camera</Text>;

    return (
        <View style={styles.container}>
            <TensorCamera
                ref={cameraRef}
                style={styles.camera}
                // type={Camera.Constants.Type.front}
                onReady={handleCameraStream}
                resizeHeight={200}
                resizeWidth={152}
                resizeDepth={3}
                autorender={true}
                useCustomShadersToResize={false}
                cameraTextureWidth={1520}  // You might need to adjust these values
                cameraTextureHeight={2000}  // You might need to adjust these values
            />
            <View style={styles.overlay}>
                <Svg height="100%" width="100%" viewBox={`0 0 ${width} ${height}`}>
                    <Circle
                        cx={width / 2}
                        cy={height / 2}
                        r={150}
                        stroke="white"
                        strokeWidth="2"
                        fill="none"
                    />
                    <Line
                        x1={width / 2}
                        y1={height / 2 - 180}
                        x2={width / 2}
                        y2={height / 2 - 120}
                        stroke={currentDirection === 'up' ? 'green' : 'white'}
                        strokeWidth="4"
                    />
                    <Line
                        x1={width / 2}
                        y1={height / 2 + 120}
                        x2={width / 2}
                        y2={height / 2 + 180}
                        stroke={currentDirection === 'down' ? 'green' : 'white'}
                        strokeWidth="4"
                    />
                    <Line
                        x1={width / 2 - 180}
                        y1={height / 2}
                        x2={width / 2 - 120}
                        y2={height / 2}
                        stroke={currentDirection === 'left' ? 'green' : 'white'}
                        strokeWidth="4"
                    />
                    <Line
                        x1={width / 2 + 120}
                        y1={height / 2}
                        x2={width / 2 + 180}
                        y2={height / 2}
                        stroke={currentDirection === 'right' ? 'green' : 'white'}
                        strokeWidth="4"
                    />
                </Svg>
                {!livenessCheckComplete ? (
                    <Text style={styles.directionText}>
                        Move your face {currentDirection} ({sequenceIndex + 1}/{SEQUENCE_LENGTH})
                    </Text>
                ) : (
                    <Text style={styles.successText}>Liveness check complete!</Text>
                )}
                {error && <Text style={styles.errorText}>{error}</Text>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    directionText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
    },
    successText: {
        color: 'green',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: 'rgba(255,255,255,0.7)',
        padding: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: 'rgba(255,255,255,0.7)',
        padding: 10,
        position: 'absolute',
        bottom: 50,
    },
});

export default LivenessDetection;