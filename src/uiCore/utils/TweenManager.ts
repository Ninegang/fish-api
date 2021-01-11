namespace uiCore {
	export class TweenManager {
		public constructor() {

		}
		public static Linear(type: string, t: number, b: number, c: number, d: number): number {
			let result: number = 0;
			switch (type) {
				case "easeNone":
					result = c * t / d + b;
					break;
				case "in":
					result = c * t / d + b;
					break;
				case "out":
					result = c * t / d + b;
					break;
				case "easeInOut":
					result = c * t / d + b;
					break;
				default:
					break;
			}
			return result;
		}

		public static Expo(type: string, t: number, b: number, c: number, d: number): number {
			let result: number = 0;
			switch (type) {
				case "in":
					result = (t == 0) ? b : c * Math.pow(2.0, 10 * (t / d - 1)) + b - c * 0.001;
					break;
				case "out":
					result = (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
					break;
				case "easeInOut":
					if (t == 0) result = b;
					if (t == d) result = b + c;
					if ((t /= d * 0.5) < 1) result = c * 0.5 * Math.pow(2, 10 * (t - 1)) + b;
					result = c * 0.5 * (-Math.pow(2, -10 * --t) + 2) + b;
					break;
				default:
					break;
			}
			return result;
		}

		public static Sine(type: string, t: number, b: number, c: number, d: number): number {
			let result: number = 0;
			let _HALF_PI: number = Math.PI * 0.5;
			switch (type) {
				case "in":
					result = -c * Math.cos(t / d * _HALF_PI) + c + b;
					break;
				case "out":
					result = c * Math.sin(t / d * _HALF_PI) + b;
					break;
				case "easeInOut":
					result = -c * 0.5 * (Math.cos(Math.PI * t / d) - 1.0) + b;
					break;
				default:
					break;
			}
			return result;
		}

		public static Call(functionName: string, easeType: string, t: number, b: number, c: number, d: number): number {
			switch (functionName) {
				case "linear":
					return this.Linear(easeType, t, b, c, d);
				case "sine":
					return this.Sine(easeType, t, b, c, d);
				case "expo":
					return this.Expo(easeType, t, b, c, d);
				default:
					return 0;
			}
		}
	}
}