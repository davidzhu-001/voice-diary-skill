// index.js - 语音日记的底层执行工具
export async function saveDiary(content, filename) {
  try {
    // 获取应用的私有文档目录
    const dir = await FileSystem.getDirectoryAsync(FileSystem.DocumentDirectory);
    const fileUri = `${dir.uri}/${filename}`;

    // 写入文件
    await FileSystem.writeAsStringAsync(fileUri, content, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    return `成功保存日记到: ${fileUri}`;
  } catch (error) {
    return `保存失败: ${error.message}`;
  }
}