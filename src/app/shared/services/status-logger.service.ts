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
    toastSeverity?: 'success' | 'info' | 'warn' | 'error',
    ...objs: unknown[]) {
      if(logToToast) this.logStatusToToast(toastSeverity ?? 'info', summary, detail ?? undefined)
      let messageString = `${this.logLabel}\n${summary}\n${detail}`;
      console.log(messageString);
      if(objs.length > 0) console.log(this.objectPrintOutStatement);
      for(const obj in objs) {
        this.logObjectToConsole(obj);
      }
    }

  /**
   * Log an error to the console
   * @param summary Primary message. Ideally a short sumation.
   * @param logToToast Boolean indicating whether this message should
   * also be sent as a toast to the user.
   * @param err A JavaScript Error object to optionally print out alongside message.
   * @param detail Main message. Full descriptor of what is trying to be conveyed
   * to the user.
   * @param objs Optional objects to print out for debugging purposes.
   */
  logErrorToConsole(
    summary: string,
    logToToast = false,
    err?: Error,
    detail?: string,
    ...objs: unknown[]): void {
      if(logToToast) this.logStatusToToast('error', summary, detail ?? undefined)
      let errorString = `${this.logLabel}\n${summary}\n${detail}`;
      if(err) {
        errorString += `\n${this.errorStackTracePrintOutStatement}`
      }
      console.error(errorString);
      if(err) this.logObjectToConsole(err);
      if(objs.length > 0) console.log(this.objectPrintOutStatement);
      for(const obj in objs) {
        this.logObjectToConsole(obj);
      }
  }

  logStatusToToast(
    toastSeverity: 'success' | 'info' | 'warn' | 'error',
    toastSummary: string,
    toastDetail?: string): void {
    this.primeNgMessageService.add({
      severity: toastSeverity,
      summary: toastSummary,
      detail: toastDetail ?? this.defaultToastDetail
    })
  }

  logObjectToConsole(obj: unknown, label?: string): void {
    if(label) console.log(`Printing out ${label}`);
    console.log(obj);
  }
}
