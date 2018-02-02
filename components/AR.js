'use strict'

import Expo, { Asset } from 'expo'
import React, { Component } from 'react'
import { PanResponder} from 'react-native'
import { connect } from 'react-redux'

const THREE = require('three') // Supported builtin module
// global.THREE = THREE
// require('../utils/OBJLoader')
import ExpoTHREE from 'expo-three'


console.disableYellowBox = true

const scaleLongestSideToSize = (mesh, size) => {
  const { x: width, y: height, z: depth } =
    new THREE.Box3().setFromObject(mesh).size()
  const longest = Math.max(width, Math.max(height, depth))
  const scale = size / longest
  mesh.scale.set(scale, scale, scale)
}

class AR extends Component {

  constructor () {
    super()

    // this._preloadAssetsAsync()

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderRelease: this._handlePanResponderRelease.bind(this)
    })

    this.state = {
      loaded: false,
    }
  }

  // React Native Touch event responders
  _handlePanResponderRelease = () => {
    this.props.navigation.goBack()
  }

  // async _preloadAssetsAsync() {
  //   await Promise.all([
  //     require('../assets/orange/orange.obj'),
  //     require('../assets/orange/orange.mtl')
  //   ].map((module) => Expo.Asset.fromModule(module).downloadAsync()))
  //   this.setState({ loaded: true })
  // }

  // ARKit/Three.js functions
  _onGLContextCreate = async (gl) => {
    // Create AR Session
    const arSession = await this._glView.startARSessionAsync()

    // Overwrite Three.js camera with ARKit camera
    const camera = ExpoTHREE.createARCamera(
      arSession,
      gl.drawingBufferWidth,
      gl.drawingBufferHeight,
      0.01,
      1000
    )

    // Configure the renderer
    const renderer = ExpoTHREE.createRenderer({ gl })
    const { drawingBufferWidth: width, drawingBufferHeight: height} = gl
    renderer.setSize(width, height)

    // Create the scene and set its background to device camera's live video feed
    const scene = new THREE.Scene()
    scene.background = ExpoTHREE.createARBackgroundTexture(arSession, renderer)

    // Render model
    // const modelAsset = Asset.fromModule(require('../assets/orange/orange.obj'))
    // await modelAsset.downloadAsync()
    // const loader = new THREE.OBJLoader()
    // const model = loader.parse(
    //   await Expo.FileSystem.readAsStringAsync(modelAsset.localUri))

    console.log('model loaded')
    // Texture
    // const textureAsset = Asset.fromModule(require('../assets/wooden-duck.png'))
    // const objTexture = new THREE.Texture()
    // objTexture.image = {
    //   data: textureAsset,
    //   width: textureAsset.width,
    //   height: textureAsset.height,
    // }
    // objTexture.needsUpdate = true
    // objTexture.isDataTexture = true // send to gl.texImage2D() verbatim
    // const objMaterial =  new THREE.MeshPhongMaterial({map: objTexture})

    // var mtlLoader = new THREE.MTLLoader()
    console.log('mtl loader initial')
    // mtlLoader.setBaseUrl( '../assets/orange/' )
    // mtlLoader.setPath( '../assets/orange/' )
    // var url = require('orange.mtl')
    // mtlLoader.load( url, async function( materials ) {

    //     materials.preload()

    //     // const modelAsset = Asset.fromModule(require('../assets/orange/orange.obj'))
    //     // await modelAsset.downloadAsync()
    //     // const loader = new THREE.OBJLoader()
    //     // loader.setMaterials( materials )
    //     // loader.setPath('../assets/orange/')
    //     // const model = loader.parse(
    //     // await Expo.FileSystem.readAsStringAsync(modelAsset.localUri))

    //     const { x: xFromScreen, y: yFromScreen, z: zFromScreen } = camera.getWorldPosition()
    //     model.position.set(xFromScreen, yFromScreen, zFromScreen - 2)
    //     scene.add(model)

    // })

    const loadModelsAsync = async () => {
      /// Get all the files in the mesh
      const model = {
        'orange.obj': require('../assets/orange/orange.obj'),
        'orange.mtl': require('../assets/orange/orange.mtl'),
        'orange.png': require('../assets/wooden-duck.png')
      }

      /// Load model!
      const mesh = await ExpoTHREE.loadAsync(
        [
          model['orange.obj'],
          model['orange.mtl']
        ],
        null,
        name => model[name],
      )

      // mesh.material.color = new THREE.Color('blue')
      // console.log('mesh', mesh)

      /// Update size and position
      ExpoTHREE.utils.scaleLongestSideToSize(mesh, 0.9)
      ExpoTHREE.utils.alignMesh(mesh, { y: 1 })
      /// Smooth mesh
      // ExpoTHREE.utils.computeMeshNormals(mesh)

      /// Add the mesh to the scene
      const { x: xFromScreen, y: yFromScreen, z: zFromScreen } = camera.getWorldPosition()
      mesh.position.set(xFromScreen, yFromScreen, zFromScreen - 2)
      scene.add(mesh)
      this.mesh = mesh
    }


    console.log('mtl defined')

    await loadModelsAsync()

    // console.log('model.mesh', model.mesh)

    // model.traverse((child) => {
    //   if (child instanceof THREE.Mesh) {
    //     child.material = objMaterial
    //   }
    // })

    // console.log('hi there')
    // console.log('mesh', model.mesh)

    // Add object to scene
    // const { x: xFromScreen, y: yFromScreen, z: zFromScreen } = camera.getWorldPosition()
    // model.position.set(xFromScreen, yFromScreen, zFromScreen - 2)
    // scene.add(model)

    // var particleCount = 500,
    // particles = new THREE.Geometry(),
    // pMaterial = new THREE.PointCloudMaterial({
    //   size: Math.random(),
    //   vertexColors: THREE.VertexColors
    // })

    // console.log('particles')

    // // now create the individual particles
    // for (var p = 0; p < particleCount; p++) {

    //   // create a particle with random
    //   // position values, -250 -> 250
    //   var pX = Math.random() * 1000 - 500,
    //       pY = Math.random() * 1000 - 500,
    //       pZ = Math.random() * 1000 - 500

    //   // add it to the geometry
    //   particles.vertices.push(new THREE.Vector3(0, 0, -5))
    //   particles.colors.push(new THREE.Color(Math.random(), Math.random(), Math.random()))
    // }

    // console.log('1000 particles')

    // // create the particle system
    // var pointCloud = new THREE.PointCloud(particles, pMaterial)
    // scene.add(pointCloud)

    // console.log('particle system')

    // Define frame animation behavior and begin animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      // particles.vertices.forEach((particle, idx) => {
      //   var dX, dY, dZ
      //   dX = Math.random() * 4 - 2
      //   dY = Math.random() * 4 - 2
      //   dZ = Math.random() * 4 - 2
      //   particle.add(new THREE.Vector3(dX, dY, dZ))
      //   particles.colors[idx] = new THREE.Color(Math.random(), Math.random(), Math.random())
      // })
      // particles.verticesNeedUpdate = true
      // particles.colorsNeedUpdate = true

      this.mesh.rotation.y += 0.1

      renderer.render(scene, camera)
      gl.endFrameEXP()
    }
    animate()

  }

  render () {
    return (
      <Expo.GLView
        {...this._panResponder.panHandlers}
        ref={ref => this._glView = ref}
        style={styles.container}
        onContextCreate={this._onGLContextCreate}
      />
    )
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6c5ce7',
    textAlign: 'center'
  }
}

export default connect()(AR)


/*
import Expo, { Asset } from 'expo';
import React from 'react';
import { View, PanResponder } from 'react-native';

const THREE = require('three');
global.THREE = THREE;
require('../utils/OBJLoader');
require('../utils/Water');
import ExpoTHREE from 'expo-three';
import * as CANNON from 'cannon';

const WATER_Y = -0.15;

console.disableYellowBox = true;

const scaleLongestSideToSize = (mesh, size) => {
  const { x: width, y: height, z: depth } =
    new THREE.Box3().setFromObject(mesh).size();
  const longest = Math.max(width, Math.max(height, depth));
  const scale = size / longest;
  mesh.scale.set(scale, scale, scale);
}

class BlueOverlay extends React.Component {
  state = {
    visible: false,
  }

  render() {
    return this.state.visible ? (
      <View
        style={{
          position: 'absolute',
          left: 0, top: 0, bottom: 0, right: 0,
          backgroundColor: '#001e0fa0',
        }}
      />
    ) : null;
  }

  setVisible(visible) {
    this.setState({ visible });
  }
}

export default class App extends React.Component {
  state = {
    loaded: false,
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        this.touching = true;
      },
      onPanResponderRelease: () => {
        this.touching = false;
      },
      onPanResponderTerminate: () => {
        this.touching = false;
      },
      onShouldBlockNativeResponder: () => false,
    });
    this.preloadAssetsAsync();
  }

  render() {
    return this.state.loaded ? (
      <View style={{ flex: 1 }}>
        <Expo.GLView
          {...this.panResponder.panHandlers}
          ref={(ref) => this._glView = ref}
          style={{ flex: 1 }}
          onContextCreate={this._onGLContextCreate}
        />
        <BlueOverlay ref={(ref) => this.overlay = ref} />
      </View>
    ) : <Expo.AppLoading />;
  }

  async preloadAssetsAsync() {
    await Promise.all([
      require('../assets/dire_dire_ducks_above_water.mp3'),
      require('../assets/dire_dire_ducks_underwater.mp3'),
      require('../assets/wooden-duck.obj'),
      require('../assets/wooden-duck.png'),
      require('../assets/waternormals.jpg'),
    ].map((module) => Expo.Asset.fromModule(module).downloadAsync()));
    this.setState({ loaded: true });
  }

  _onGLContextCreate = async (gl) => {
    const width = gl.drawingBufferWidth;
    const height = gl.drawingBufferHeight;

    gl.createRenderbuffer = () => {};
    gl.bindRenderbuffer = () => {};
    gl.renderbufferStorage  = () => {};
    gl.framebufferRenderbuffer  = () => {};

    // ar init
    const arSession = await this._glView.startARSessionAsync();

    // three.js init
    const renderer = ExpoTHREE.createRenderer({ gl });
    renderer.setSize(width, height);
    const scene = new THREE.Scene();
    const videoFeed = ExpoTHREE.createARBackgroundTexture(arSession, renderer);
    scene.background = videoFeed;
    const camera = ExpoTHREE.createARCamera(arSession, width, height, 0.01, 1000);
    // const camera = new THREE.PerspectiveCamera(75, width / height, 0.01, 1000);

    // cannon.js init
    const world = new CANNON.World();
    world.gravity.set(0, -9.82, 0);
    world.broadphase = new CANNON.NaiveBroadphase();

    // audio
    Expo.Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Expo.Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Expo.Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
    });
    const {
      sound: aboveWaterSound,
    } = await Expo.Audio.Sound.create(
      require('../assets/dire_dire_ducks_above_water.mp3'));
    const {
      sound: underWaterSound,
    } = await Expo.Audio.Sound.create(
      require('../assets/dire_dire_ducks_underwater.mp3'));
    await aboveWaterSound.setStatusAsync({
      shouldPlay: true,
      isLooping: true,
      volume: 1,
    });
    await underWaterSound.setStatusAsync({
      shouldPlay: true,
      isLooping: true,
      volume: 0,
    });
    aboveWaterSound.setPositionAsync(0);
    underWaterSound.setPositionAsync(0);

    // lights
    const dirLight = new THREE.DirectionalLight(0xdddddd);
    dirLight.position.set(1, 1, 1);
    scene.add(dirLight);
    const ambLight = new THREE.AmbientLight(0x505050);
    scene.add(ambLight);

    // ground
    const groundMaterial = new CANNON.Material();
    const groundBody = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Plane(),
      material: groundMaterial,
      position: new CANNON.Vec3(0, WATER_Y - 0.15, 0),
    });
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0), -Math.PI/2);
    world.add(groundBody);

    // objects (three.js mesh <-> cannon.js body pairs)
    const objects = [];

    // model
    const modelAsset = Asset.fromModule(require('../assets/wooden-duck.obj'));
    await modelAsset.downloadAsync();
    const loader = new THREE.OBJLoader();
    const model = loader.parse(
      await Expo.FileSystem.readAsStringAsync(modelAsset.localUri))

    // texture
    const textureAsset = Asset.fromModule(require('../assets/wooden-duck.png'));
    const ballTexture = new THREE.Texture();
    ballTexture.image = {
      data: textureAsset,
      width: textureAsset.width,
      height: textureAsset.height,
    };
    ballTexture.needsUpdate = true;
    ballTexture.isDataTexture = true; // send to gl.texImage2D() verbatim
    const ballMaterial =  new THREE.MeshPhongMaterial({map: ballTexture});

    scaleLongestSideToSize(model, 0.18);

    // ball
    const ballPhysicsMaterial = new CANNON.Material();
    for (let i = 0; i < 20; ++i) {
      const ball = {}
      ball.mesh = model.clone();
      ball.mesh.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = ballMaterial;
        }
      });
      scene.add(ball.mesh);
      ball.body = new CANNON.Body({
        mass: 2,
        shape: new CANNON.Sphere(0.07),
        material: ballPhysicsMaterial,
        position: new CANNON.Vec3(Math.random() - 0.5, 0.5 + 3 * Math.random(), -2 + Math.random() - 0.5),
      });
      world.add(ball.body);
      objects.push(ball);
    }
    world.addContactMaterial(new CANNON.ContactMaterial(
      groundMaterial, ballPhysicsMaterial, {
        restitution: 0.7,
        friction: 0.6,
      }));

    // water
    const waterNormals = await ExpoTHREE.createTextureAsync({
      asset: Expo.Asset.fromModule(require('../assets/waternormals.jpg')),
    });
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
    const water = new THREE.Water(renderer, camera, scene, {
      textureWidth: 256, textureHeight: 256,
      waterNormals,
      alpha: 0.75,
      sunDirection: dirLight.position.normalize(),
      waterColor: 0x001e0f,
      betaVersion: 0,
      side: THREE.DoubleSide,
      distortionScale: 10,
      noiseScale: 0.005,
    });
    const waterMesh = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(30, 30, 10, 10),
      water.material,
    );
    waterMesh.add(water);
		waterMesh.rotation.x = -Math.PI * 0.5;
    waterMesh.position.y = WATER_Y;
    scene.add(waterMesh);

    // main loop
    let lastAbove = true;
    const buoyancy = 20;
    const animate = () => {
      // calculate camera position
      camera.position.setFromMatrixPosition(camera.matrixWorld);
      const cameraPos = new THREE.Vector3(0, 0, 0);
      cameraPos.applyMatrix4(camera.matrixWorld);

      // swap sounds based on above/under water
      if (camera.position.y < WATER_Y) {
        if (lastAbove) {
          this.overlay.setVisible(true);
          aboveWaterSound.setStatusAsync({ volume: 0 });
          underWaterSound.setStatusAsync({ volume: 1 });
        }
        lastAbove = false;
      } else {
        if (!lastAbove) {
          this.overlay.setVisible(false);
          aboveWaterSound.setStatusAsync({ volume: 1 });
          underWaterSound.setStatusAsync({ volume: 0 });
        }
        lastAbove = true;
      }

      // update water animation
      water.material.uniforms.time.value += 1 / 60;

      // update world
      world.step(1 / 60);

      // update objects
      objects.forEach(({ mesh, body }) => {
        mesh.position.copy(body.position);
        mesh.quaternion.copy(body.quaternion);
      });

      // buoyancy and underwater damping
      objects.forEach(({ body }) => {
        if (body.position.y < WATER_Y) {
          const depth = Math.abs(WATER_Y - body.position.y);
          body.applyForce(
            new CANNON.Vec3(0, Math.max(20, 100 * depth), 0), body.position);
          const damping = body.velocity.scale(-0.4);
          body.applyForce(damping, body.position);
        }
      });

      // apply force toward camera if touching
      objects.forEach(({ body }) => {
        if (this.touching) {
          const d = body.position.vsub(cameraPos).unit().scale(-1.2);
          body.applyForce(d, body.position);
        }
      });

      // render water
      scene.background = new THREE.Color(0.3, 0.3, 0.3);
      water.render();
      scene.background = videoFeed;

      // end frame and schedule new one!
      renderer.render(scene, camera);
      gl.endFrameEXP();
      requestAnimationFrame(animate);
    }
    animate();
  }
}

*/
