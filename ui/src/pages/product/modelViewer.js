import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ModelViewer = () => {
  const location = useLocation();
  const modelPath = new URLSearchParams(location.search).get('modelPath');
  const mountRef = useRef(null);

  useEffect(() => {
    if (!modelPath) {
      console.error("No model path provided");
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const loader = new OBJLoader();
    loader.load(
      modelPath,
      (obj) => {
        obj.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            child.material = new THREE.MeshStandardMaterial({ color: 0x555555 });
          }
        });
        scene.add(obj);
        animate();
      },
      undefined,
      (error) => {
        console.error('An error happened while loading the 3D model:', error);
      }
    );

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 1, 1).normalize();
    scene.add(light);

    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.z = 5;
    controls.update();

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [modelPath]);

  return (
    <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />
  );
};

export default ModelViewer;
