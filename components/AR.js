import Expo from 'expo'
import React from 'react'
import ExpoTHREE from 'expo-three'
import { connect } from 'react-redux'
import Files from '../Files'
import { View, TextInput } from 'react-native'
import { ThreeView } from './'
const hsl = require('@davidmarkclements/hsl-to-hex')

/// To make fonts use this -> https://gero3.github.io/facetype.js/
let height = 0.2,
  size = 0.7,
  hover = 1,
  curveSegments = 12,
  bevelThickness = 0.02,
  bevelSize = 0.015,
  bevelEnabled = true

let fontIndex = 3
const fontWeights = ['thin', 'regular', 'medium', 'black']
const fontName = 'neue_haas_unica_pro'

class AR extends React.Component {
  static defaultProps = {
    onLoadingUpdated: ({ loaded, total }) => {},
    onFinishedLoading: () => {}
  }

  _font = fontWeights[fontIndex]
  set fontWeight(value) {
    if (this.fontWeight === value) {
      return
    }
    this._font = value
  }
  get fontWeight() {
    return this._font
  }

  nextFont = async () => {
    fontIndex = (fontIndex + 1) % fontWeights.length
    this.fontData = await this.loadFont({
      name: fontName,
      weight: fontWeights[fontIndex]
    })
    this.createText(this.text)
  }

  _text = 'EXPO'
  set text(value) {
    if (this.text === value) {
      return
    }
    this._text = value
    this.createText(value)
  }
  get text() {
    return this._text
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { props, state } = this
    return false
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ThreeView
          style={{ flex: 1 }}
          onContextCreate={this.onContextCreateAsync}
          render={this.animate}
          enableAR={this.AR}
        />
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            width: '100%'
          }}
          onChangeText={text => (this.text = text)}
        />
      </View>
    )
  }

  onContextCreateAsync = async (gl, arSession) => {
    const {
      innerWidth: width,
      innerHeight: height,
      devicePixelRatio: scale
    } = window

    // renderer
    this.renderer = ExpoTHREE.createRenderer({ gl })
    this.renderer.setPixelRatio(scale)
    this.renderer.setSize(width, height)
    this.renderer.setClearColor(0x000000, 1.0)

    this.setupScene(arSession)

    // resize listener
    window.addEventListener('resize', this.onWindowResize, false)

    // setup custom world
    await this.setupWorldAsync()

    this.props.onFinishedLoading()
  }

  setupScene = arSession => {
    const {
      innerWidth: width,
      innerHeight: height,
      devicePixelRatio: scale
    } = window

    // scene
    this.scene = new THREE.Scene()

    /// AR Camera
    this.camera = ExpoTHREE.createARCamera(arSession, width, height, 0.01, 1000)

    setupLights = () => {
      // lights
      let light = new THREE.DirectionalLight(0xffffff, 0.125)
      light.position.set(0, 0, 1).normalize()
      this.scene.add(light)

      light = new THREE.PointLight(0xffffff, 1.5)
      light.position.set(0, 100, 90)
      this.scene.add(light)
    }

    loadFont = async ({ name, weight }) => {
      const uri = `${name}_${weight}`
      const asset = Expo.Asset.fromModule(Files.three_fonts[uri])

      const loader = new THREE.FontLoader()
      return await new Promise((res, rej) =>
        loader.load(asset.localUri, res, () => {}, rej)
      )
    }
    textGroup = new THREE.Group()
    createText = text => {
      if (this.textGeo) {
        this.textGeo.dispose()
      }

      this.textGeo = new THREE.TextBufferGeometry(text, {
        font: this.fontData,
        size: size,
        height: height,
        curveSegments: curveSegments,
        bevelThickness: bevelThickness,
        bevelSize: bevelSize,
        bevelEnabled: bevelEnabled,
        material: 0,
        extrudeMaterial: 1
      })
      this.textGeo.computeBoundingBox()
      this.textGeo.computeVertexNormals()

      if (!this.textMesh) {
        const mirrorMaterial = new THREE.MeshPhongMaterial({
          emissive: 0x111111,
          envMap: this.camera.renderTarget
        })

        const materials = [
          new THREE.MeshPhongMaterial({ color: 0x2188ff, flatShading: false }), // front
          new THREE.MeshPhongMaterial({ color: 0x2188ff }) // side
        ]
        this.textMesh = new THREE.Mesh(this.textGeo, materials)
        this.textMesh.position.y = hover
        this.textMesh.position.z = 0
        this.textMesh.rotation.x = 0
        this.textMesh.rotation.y = Math.PI * 2
        this.textGroup.add(this.textMesh)
        console.warn('', this.textMesh.material)
      } else {
        this.textMesh.geometry = this.textGeo
      }

      let centerOffset =
        -0.5 * (this.textGeo.boundingBox.max.x - this.textGeo.boundingBox.min.x)
      this.textMesh.position.x = centerOffset
    }

    setupWorldAsync = async () => {
      this.textGroup.scale.set(0.2, 0.2, 0.2)
      this.scene.add(this.textGroup)
      this.setupLights()
      await this.nextFont()

      this.scene.add(new THREE.GridHelper(20, 10))

      window.document.addEventListener('touchstart', e => {
        this.nextFont()
      })
    }

    onWindowResize = () => {
      const {
        innerWidth: width,
        innerHeight: height,
        devicePixelRatio: scale
      } = window

      this.camera.aspect = width / height
      this.camera.updateProjectionMatrix()
      this.renderer.setPixelRatio(scale)
      this.renderer.setSize(width, height)
    }

    hue = 0
    animate = delta => {
      if (this.textGroup) {
        // this.textGroup.rotation.y += 0.5 * delta;

        if (this.textMesh.material) {
          this.hue = (this.hue + 1) % 360
          const saturation = 40
          const luminosity = 60
          const hex = hsl(this.hue, saturation, luminosity)
          const numHex = parseInt(hex.replace(/^#/, ''), 16)
          this.textMesh.material.map(material => material.color.setHex(numHex))
        }
      }

      // Render the scene
      this.renderer.render(this.scene, this.camera)
    }
  }
}

export default connect()(AR)
