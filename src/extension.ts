'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import {HttpPreviewContentProvider} from './httpPreviewContentProvider'

let config = vscode.workspace.getConfiguration('pruga')
const SHOW_INFORMATION_MESSAGE = config["showInformationMessage"] || false

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "pruga-vscode-preview" is now active!');
    
    let provider = new HttpPreviewContentProvider();
    let registration = vscode.workspace.registerTextDocumentContentProvider("http", provider);

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('pruga.preview', () => {
        // The code you place here will be executed every time your command is executed

        const rootPath = vscode.workspace.rootPath || ''

        /*let success = await*/ vscode.commands.executeCommand('vscode.previewHtml', `http://localhost/${path.basename(rootPath)}/index.html`, vscode.ViewColumn.Two)
        // vscode.commands.executeCommand('vscode.previewHtml', previewUri, vscode.ViewColumn.Two)
            .then(
                success => {
                    console.log(`Пруга preview: web will be preview: ${success}`)
                    if(SHOW_INFORMATION_MESSAGE) {
                        vscode.window.showInformationMessage(`Пруга preview: web will be preview: ${success}`);
                    }
                    
                },
                // then error
                    err => {
                        vscode.window.showErrorMessage(`Пруга preview: ERROR web will be not preview: ${err}`)
                    }
                )
        
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
   
}