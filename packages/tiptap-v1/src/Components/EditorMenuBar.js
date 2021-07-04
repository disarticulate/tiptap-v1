import MenuBar from '../Plugins/MenuBar'

export default {

  props: {
    editor: {
      default: null,
      type: Object,
    },
  },

  watch: {
    editor (newVal, oldVal) {
      if (newVal) this.ready = false
      if (!newVal && oldVal) this.ready = false
    }
  },

  data() {
    return {
      ready: false,
      focused: false,
    }
  },

  methods: {
    mountMenu (component) {
      if (this.ready) return
      let el = component.$el || component
      if (!el) return
      this.editor.registerPlugin(MenuBar({
        editor: this.editor,
        element: el
      }))
      this.focused = this.editor.focused
      this.editor.on('focus', () => {
        this.focused = true
      })
      this.editor.on('menubar:focusUpdate', focused => {
        this.focused = focused
      })
      this.ready = true
    }
  },

  render() {
    let hasEditor = !!this.editor
    if (!hasEditor) return
    return this.$.slots.default({
      ready: this.ready,
      mountMenu: this.mountMenu,
      focused: this.focused,
      focus: this.editor.focus,
      commands:  this.editor.commands,
      isActive:  this.editor.isActive,
      getMarkAttrs: this.editor.getMarkAttrs.bind(this.editor),
      getNodeAttrs: this.editor.getNodeAttrs.bind(this.editor),
    })
  },

}
