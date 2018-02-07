import Expo from 'expo'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import ExpoTHREE from 'expo-three'
import { View } from 'react-native'
import { ARThreeView } from './'
const hsl = require('@davidmarkclements/hsl-to-hex')

import Files from '../../Files'

console.disableYellowBox = true

// AR letter code adapted from https://github.com/EvanBacon/expo-three-text
// by Evan Bacon

// 3D letter properties
let height = 1,
  size = 1,
  hover = -0.5,
  curveSegments = 50

// font parsing
const FONT_INDEX = 2
const fontWeights = ['thin', 'regular', 'medium', 'black']
const fontName = 'neue_haas_unica_pro'

class AR extends Component {
  static defaultProps = {
    onLoadingUpdated: ({ loaded, total }) => {},
    onFinishedLoading: () => {}
  }

  _font = fontWeights[FONT_INDEX]
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
    this.fontData = await this.loadFont({
      name: fontName,
      weight: fontWeights[FONT_INDEX]
    })
    this.createText(this.text)
  }

  _text = this.props.nearestLetter ? this.props.nearestLetter.letterCategory.name : null
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

  _words = this.props.nearestWords ? this.props.nearestWords : null
  set words(value) {
    if (this.words === value) {
      return
    }
    this._words = value
    this.createWords(value)
  }
  get words() {
    return this._words
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { props, state } = this
    return false
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ARThreeView
          style={{ flex: 1 }}
          onContextCreate={this.onContextCreateAsync}
          render={this.animate}
          enableAR={this.AR}
        />
      </View>
    )
  }

  onContextCreateAsync = async (gl, arSession) => {
    // renderer
    this.renderer = ExpoTHREE.createRenderer({ gl })
    this.renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight)
    this.setupScene(gl, arSession)

    // setup custom world
    await this.setupWorldAsync()

    // lift state to switch from Loading to AR component
    this.props.onFinishedLoading()
  }

  setupScene = (gl, arSession) => {
    // scene
    this.scene = new THREE.Scene()
    this.scene.background = ExpoTHREE.createARBackgroundTexture(arSession, this.renderer)
    this.camera = ExpoTHREE.createARCamera(
      arSession,
      gl.drawingBufferWidth,
      gl.drawingBufferHeight,
      0.01,
      1000
    )
  }

  setupLights = () => {
    // lights
    let light = new THREE.DirectionalLight(0xffffff, 0.125)
    light.position.set(0, 0, 1).normalize()
    this.scene.add(light)

    light = new THREE.PointLight(0xffffff, 1.5)
    light.position.set(0, 100, 90)
    this.scene.add(light)

    light = new THREE.DirectionalLight(0x002288)
    light.position.set(-1, -1, -1)
    this.scene.add(light)

    light = new THREE.AmbientLight(0x222222)
    this.scene.add(light)
  }

  loadFont = async ({ name, weight }) => {
    const uri = `${name}_${weight}`
    const asset = Expo.Asset.fromModule(Files.three_fonts[uri])
    const loader = new THREE.FontLoader()
    return await (new Promise((res, rej) => loader.load(asset.localUri, res, (() => { }), rej)))
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
      material: 0,
      extrudeMaterial: 1
    })
    this.textGeo.computeBoundingBox()
    this.textGeo.computeVertexNormals()

    if (!this.textMesh) {
      const materials = [
        new THREE.MeshPhongMaterial({ color: 0x706fd3, flatShading: false }), // front
        new THREE.MeshPhongMaterial({ color: 0x706fd3 }) // side
      ]
      this.textMesh = new THREE.Mesh(this.textGeo, materials)
      this.textMesh.position.y = hover
      this.textMesh.position.z = -3
      this.textMesh.rotation.x = 0
      this.textMesh.rotation.y = 0
      this.textGroup.add(this.textMesh)
    } else {
      this.textMesh.geometry = this.textGeo
    }

    let centerOffset =
      -0.5 * (this.textGeo.boundingBox.max.x - this.textGeo.boundingBox.min.x)
    this.textMesh.position.x = centerOffset
  }

  createWords = () => {
    let hexColors = ['#ff5252', '#34ace0', '#f7f1e3', '#ffda79', '#ff793f']

    if (this.textGeo) {
      this.textGeo.dispose()
    }

    this.words.forEach((word, idx) => {
    this.textGeo = new THREE.TextBufferGeometry(word, {
      font: this.fontData,
      size: Math.random() * 10 + size,
      height: height,
      curveSegments: curveSegments,
      material: 0,
      extrudeMaterial: 1
    })
    this.textGeo.computeBoundingBox()
    this.textGeo.computeVertexNormals()

    const materials = [
      new THREE.MeshPhongMaterial({ color: hexColors[idx], flatShading: false }), // front
      new THREE.MeshPhongMaterial({ color: hexColors[idx] }) // side
    ]
    this.textMesh = new THREE.Mesh(this.textGeo, materials)
    this.textMesh.position.x = Math.random() * 400 - 200
    this.textMesh.position.y = hover
    this.textMesh.position.z = Math.random() * -25 + 12.5
    this.textMesh.rotation.x = 0
    this.textMesh.rotation.y = 2 * Math.PI * Math.random()
    this.textGroup.add(this.textMesh)

    delete this.textMesh
    delete this.textGeo

    })
  }

  setupWorldAsync = async () => {
    this.textGroup.scale.set(0.2, 0.2, 0.2)
    this.scene.add(this.textGroup)
    this.setupLights()
    this.fontData = await this.loadFont({
      name: fontName,
      weight: fontWeights[FONT_INDEX]
    })
    if (this.text) await this.createText(this.text)
    else if (this.words && this.words.length) await this.createWords(this.words)

  }

  hue = 241
  animate = delta => {
    if (this.textGroup) {
      if (this.props.nearestLetter && !this.props.nearestWords) {
        if (this.textMesh.material) {
          this.hue = (this.hue + 1) % 360
          const saturation = 53
          const luminosity = 63
          const hex = hsl(this.hue, saturation, luminosity)
          const numHex = parseInt(hex.replace(/^#/, ''), 16)
          this.textMesh.material.map(material => material.color.setHex(numHex))
        }
      }
    }

    // Render the scene
    this.renderer.render(this.scene, this.camera)
  }
}

export default connect()(AR)
