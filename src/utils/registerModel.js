import app from 'SRC/app'

const cached = {}

export default function registerModel(model) {
  if (!cached[model.namespace]) {
    cached[model.namespace] = 1
    app.model(model)
  }
}
