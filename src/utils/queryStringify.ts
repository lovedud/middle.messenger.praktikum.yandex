export default function queryStringify(data: any): string {
    if (!data) return '';
    const dataArr = [];
    let result = '';
    for (const key of Object.keys(data)) {
        if (Array.isArray(data[key])) {
            result = `${key}=${data[key].join(',')}`;
        }
        else if (typeof data[key] === 'object') {
            result = `${key}=[object Object]`;
        }
        else {
            result = `${key}=${data[key]}`;
        }
        dataArr.push(result);
    }
    return `?${dataArr.join('&')}`;
}
