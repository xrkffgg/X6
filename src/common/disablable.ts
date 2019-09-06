import { Primer } from './primer'

export class Disablable extends Primer {
  private disabled: boolean = false

  get enabled() {
    return !this.disabled
  }

  isEnabled() {
    return !this.disabled
  }

  enable() {
    this.disabled = false
  }

  disable() {
    this.disabled = true
  }
}