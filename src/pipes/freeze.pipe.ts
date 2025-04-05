import { Injectable, Logger, PipeTransform } from "@nestjs/common";

@Injectable()
export class FreezePipe implements PipeTransform {
    private logger = new Logger(FreezePipe.name);
  transform(value: any) {
          Object.freeze(value);
         this.logger.log(FreezePipe.name);
     return value;
  }
}