function main() {

    // スプレッドシートを開く
    const spreadSheet = SpreadsheetApp.openById(SpreadsheetID);

    const targetSheet = spreadSheet.getSheetByName(SheetName);

    // シートを取得
    const urlList = targetSheet.getRange("A:A").getValues();

    // 作業用変数
    let tmpList = toCalculationList(urlList);

    // タグ名を指定してメールを検索
    const threads = GmailApp.search(Search);

    // メールの内容をスプレッドシートに追加
    threads.forEach(thread => {
        const messages = thread.getMessages();
        messages.forEach(message => {
            const urls = extractURLs(message.getPlainBody());
            urls.forEach(url => tmpList.push(url));
        });
    });

    if (urlList.length < tmpList.length) {
        // 行が足りなかった場合 追加
        targetSheet.insertRowAfter(tmpList.length - urlList.length);
    } else {
        tmpList = tmpList.concat(Array(urlList.length - tmpList.length).fill(""));
    }

    // シートを更新
    targetSheet.getRange("A:A").setValues(toSheetList(tmpList));

    // メメール削除
    threads.forEach(thread => thread.moveToTrash());
}
