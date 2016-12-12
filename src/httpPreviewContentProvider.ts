import * as vscode from 'vscode';

export class HttpPreviewContentProvider implements vscode.TextDocumentContentProvider{
    private _onDidChange = new vscode.EventEmitter<vscode.Uri>();

    public provideTextDocumentContent(uri:vscode.Uri):string{

		console.log(`пруга preview ${uri}`);

        return `<!DOCTYPE html><html><head><style>
		html, body, canvas, div {
			margin:0;
			padding: 0;			
			width:100%;
			height:100%;
			background-color: silver;
		}
	</style></head><body><iframe src="${uri}" width="100%" height="100%" frameBorder="0"></iframe><div class="svgbg"></div></body></html>`;
    }
}