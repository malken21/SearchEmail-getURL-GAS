// テキストからURLを抽出する関数
function extractURLs(text) {
    // URLの正規表現パターン
    const urlPattern = /https?:\/\/[^\s/$.?#].[^\s>]*/g;

    // テキストからURLを抽出
    const urls = text.match(urlPattern);

    // URLの配列を返す（URLが見つからなかった場合は空の配列）
    return urls || [];
}


function toCalculationList(list) {
    return list.map(item => {
        return item[0];
    }).filter(Boolean);
}
function toSheetList(list) {
    return list.map(item => {
        return [item];
    });
}