'use strict';
import * as path from 'path';
import * as vscode from 'vscode';
import { extensionContext } from '../utilities';
import { WebViewBase } from './webviewbase';

export class Help extends WebViewBase {
  public static async Create(resourceRoot: string): Promise<Help> {
    const help = new Help(resourceRoot);
    await help.asyncInitialize();
    return help;
  }

  private constructor(resourceRoot: string) {
    super('wpilibhelp', 'WPILib Help', resourceRoot);

    this.disposables.push(vscode.commands.registerCommand('wpilibcore.help', () => {
      this.displayHelp();
    }));
  }

  public displayHelp() {
    this.displayWebView(vscode.ViewColumn.Active, true);
    
    // Set up message handler for button clicks if webview exists
    if (this.webview) {
      this.webview.webview.onDidReceiveMessage((message) => {
        switch (message.command) {
          case 'openCommandPalette':
            vscode.commands.executeCommand('workbench.action.quickOpen', '>WPILib ');
            break;
          case 'openDocumentation':
            vscode.commands.executeCommand('vscode.open', vscode.Uri.parse('https://docs.wpilib.org/en/stable'));
            break;
        }
      }, undefined, this.disposables);
    }
  }

  private async asyncInitialize() {
    const scriptPath = vscode.Uri.file(
      path.join(extensionContext.extensionPath, 'resources', 'dist', 'helpComponent.js')
    );

    this.html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script>
            // Inject VSCode API
            window.vscode = acquireVsCodeApi();
          </script>
          <link rel="stylesheet" href="replaceresource/resources/media/main.css" />
        </head>
        <body>
          <div id="app"></div>
          <script src="${scriptPath.with({ scheme: 'vscode-resource' })}"></script>
        </body>
      </html>
    `;
  }
}
