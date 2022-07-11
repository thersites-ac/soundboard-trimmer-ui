export class TrimmerResponse {
  statusCode: number = 0;
  description: string = '';

  constructor(statusCode: number,
              description: string) {
    this.statusCode = statusCode;
    this.description = description;
  }
}
