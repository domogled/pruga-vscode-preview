'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import {HttpPreviewContentProvider} from './httpPreviewContentProvider'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    const rootPath = vscode.workspace.rootPath;
    const config = require(path.join(rootPath, 'pruga.js'))
    const SHOW_INFORMATION_MESSAGE = config["showInformationMessage"]
    
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "pruga-vscode-preview" is now active!');
    
    const provider = new HttpPreviewContentProvider();
    const registration = vscode.workspace.registerTextDocumentContentProvider("http", provider);


    const {protocol, host, port, dir, file} = config.web
    const previewUri = `${protocol}://${host}:${port}/${dir}/${file}`

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    const disposable = vscode.commands.registerCommand('pruga.preview', () => {
        // The code you place here will be executed every time your command is executed



        /*let success = await*/ vscode.commands.executeCommand('vscode.previewHtml', previewUri, vscode.ViewColumn.Two)
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