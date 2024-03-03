import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

/**
 * This service is responsible for logging error and output
 * messages to the console. Utilizes the PrimeNG toast component
 * to display updates to the user.
 */
@Injectable({
  providedIn: 'root',
})
export class StatusLoggerService {
  logLabel: string = 'CONTENT-LOG:'
  errorStackTracePrintOutStatement: string = 'Printing out received error stack trace:'
  objectPrintOutStatement: string = 'Printing out objects for debugging purposes:'
  defaultToastDetail: string = 'Check console (F12) for more information.'

  constructor(private primeNgMessageService: MessageService) { }

  /**
   * Logs a message to the console.
   * @param summary Primary message. Ideally a short summation.
   * @param logToToast Boolean indicating whether this message should
   * also be sent as a toast to the user.
   * @param detail Main message. Full descriptor of what is trying to be conveyed
   * to the user.
   * @param toastSeverity If this message is being sent as a toast to the user,
   * this is the severity parameter it should use.
   * @param objs Optional objects to print out for debugging purposes.
   */
  logMessageToConsole(
    summary: string,
    logToToast = false,
    detail?: string,
    toastSeverity?: string,
    ...objs: unknown[]) {
      if(logToToast) this.logStatusToToast(toastSeverity ?? 'info', summary, detail ?? '')
      let messageString = `${this.logLabel}\n${summary}\n${detail}`;
      console.log(messageString);
      if(objs) console.log(this.objectPrintOutStatement);
      for(const obj in objs) {
        this.logObjectToConsole(obj);
      }
  }

  logErrorToConsole(
    summary: string,
    err?: Error,
    detail?: string,
    ...objs: unknown[]): void {
    let errorString = `${this.logLabel}\n${summary}\n${detail}`;
    if(err) {
      errorString += `\n${this.errorStackTracePrintOutStatement}`
    }
    console.error(errorString);
    if(err) this.logObjectToConsole(err);
    if(objs) console.log(this.objectPrintOutStatement);
    for(const obj in objs) {
      this.logObjectToConsole(obj);
    }
  }

  logStatusToToast(toastSeverity: string, toastSummary: string, toastDetail?: string): void {
    this.primeNgMessageService.add({
      severity: toastSeverity,
      summary: toastSummary,
      detail: toastDetail ?? this.defaultToastDetail
    })
  }

  logObjectToConsole(obj: unknown, label?: string): void {
    if(label) console.log(label);
    console.log(obj);
  }
}
