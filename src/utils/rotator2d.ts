import { Matrix2x2 } from "./math/Matrix2x2";
import { Matrix3x3 } from "./math/Matrix3x3";
import { Vector2 } from "./math/Vector2";

export class Rotator {
  degree: number;
  static getClampedValue(InDegree: number) {
    let angle = InDegree % 360;
    if (angle < 0) {
      angle += 360;
    }
    return angle;
  }
  constructor(InDegree: number) {
    this.degree = InDegree;
  }
  clamp() {
    this.degree = Rotator.getClampedValue(this.degree);
  }
  toRadian() {
    this.clamp();
    return (this.degree * Math.PI) / 180;
  }
  update(newDegree: number) {
    this.degree = Rotator.getClampedValue(newDegree);
  }
  getRotateMatrix() {
    const cos = Math.cos(this.toRadian());
    const sin = Math.sin(this.toRadian());
    const rotateMatrix: Matrix2x2 = new Matrix2x2(
      new Vector2(cos, sin),
      new Vector2(-sin, cos)
    );
    return rotateMatrix;
  }
  getRotateAffineMatrix() {
    const cos = Math.cos(this.toRadian());
    const sin = Math.sin(this.toRadian());
    const rotateMatrix: Matrix3x3 = new Matrix3x3(
      new Vector2(cos, sin).toAffine(false),
      new Vector2(-sin, cos).toAffine(false),
      undefined //UnitZ
    );
    return rotateMatrix;
  }
}
