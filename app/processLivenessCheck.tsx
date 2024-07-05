// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, Dimensions } from 'react-native';
// import { Camera, CameraType } from 'expo-camera';
// import * as FaceDetector from 'expo-face-detector';
// import Svg, { Circle, Line } from 'react-native-svg';

// const { width, height } = Dimensions.get('window');
// const RING_RADIUS = width * 0.4;

// const directions = ['center', 'up', 'down', 'left', 'right'] as const;
// type Direction = typeof directions[number];

// export default function LivenessCheck() {
//   const [hasPermission, setHasPermission] = useState<boolean | null>(null);
//   const [faceDetected, setFaceDetected] = useState(false);
//   const [currentDirection, setCurrentDirection] = useState<Direction>('center');
//   const [directionHistory, setDirectionHistory] = useState<Direction[]>([]);
//   const [isLive, setIsLive] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   const handleFacesDetected = ({ faces }: FaceDetector.DetectionResult) => {
//     if (faces.length > 0) {
//       setFaceDetected(true);
//       checkFacePosition(faces[0]);
//     } else {
//       setFaceDetected(false);
//     }
//   };

//   const getRandomDirection = (): Direction => {
//     const newDirection = directions[Math.floor(Math.random() * directions.length)];
//     return newDirection !== currentDirection ? newDirection : getRandomDirection();
//   };

//   const checkFacePosition = (face: any) => {
//     const { yawAngle, rollAngle } = face;
//     let detectedDirection: Direction = 'center';

//     if (Math.abs(yawAngle) > 10) {
//       detectedDirection = yawAngle > 0 ? 'left' : 'right';
//     } else if (Math.abs(rollAngle) > 10) {
//       detectedDirection = rollAngle > 0 ? 'down' : 'up';
//     }

//     if (detectedDirection === currentDirection && detectedDirection !== 'center') {
//       setDirectionHistory(prev => [...prev, detectedDirection]);
//       setCurrentDirection(getRandomDirection());
//     }
//   };

//   useEffect(() => {
//     if (directionHistory.length === 4) {
//       setIsLive(true);
//     }
//   }, [directionHistory]);

//   if (hasPermission === null) {
//     return <View />;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       {/* <Camera style={styles.camera} type={type} ref={cameraRef}/> */}
//       <Camera
//         style={StyleSheet.absoluteFill}
//         type={Camera.Constants.Type.front}
//         onFacesDetected={handleFacesDetected}
//         faceDetectorSettings={{
//           mode: FaceDetector.FaceDetectorMode.fast,
//           detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
//           runClassifications: FaceDetector.FaceDetectorClassifications.none,
//           minDetectionInterval: 100,
//           tracking: true,
//         }}
//       />
//       <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
//         <Circle
//           cx={width / 2}
//           cy={height / 2}
//           r={RING_RADIUS}
//           stroke="white"
//           strokeWidth="2"
//           fill="none"
//         />
//         {currentDirection !== 'center' && (
//           <Line
//             x1={width / 2}
//             y1={height / 2}
//             x2={width / 2 + (currentDirection === 'left' ? -RING_RADIUS : currentDirection === 'right' ? RING_RADIUS : 0)}
//             y2={height / 2 + (currentDirection === 'up' ? -RING_RADIUS : currentDirection === 'down' ? RING_RADIUS : 0)}
//             stroke="yellow"
//             strokeWidth="2"
//           />
//         )}
//       </Svg>
//       <Text style={styles.detectionText}>
//         {isLive ? 'Liveness Confirmed!' : faceDetected ? `Move your face ${currentDirection}` : 'No Face Detected'}
//       </Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   detectionText: {
//     position: 'absolute',
//     bottom: 50,
//     alignSelf: 'center',
//     color: 'white',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
// });