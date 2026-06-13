// index.js - 语音日记的底层执行工具
export async function saveDiary(content, filename) {
  try {
    // --- 修改开始：指定自定义文件夹 ---

    // 1. 获取应用的私有文件根目录 (FilesDirectory)
    const baseDir = await FileSystem.getDirectoryAsync(FileSystem.FilesDirectory);

    // 2. 定义您想要的子文件夹名称，例如 "10MyDiaries"
    const subFolderName = "10MyDiaries";
    const customDirPath = `${baseDir.uri}/${subFolderName}`;

    // 3. 检查文件夹是否存在，如果不存在则创建
    // makeDirectoryAsync 在文件夹已存在时会报错，所以用 try-catch 包裹
    try {
      await FileSystem.makeDirectoryAsync(customDirPath, { intermediates: true });
    } catch (e) {
      // 忽略“文件夹已存在”的错误，继续执行
      console.log("文件夹可能已存在:", e.message);
    }

    // 4. 拼接最终的文件保存路径
    const fileUri = `${customDirPath}/${filename}`;

    // --- 修改结束 ---

    // 写入文件
    await FileSystem.writeAsStringAsync(fileUri, content, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    return `成功保存日记到: ${fileUri}`;
  } catch (error) {
    return `保存失败: ${error.message}`;
  }
}
