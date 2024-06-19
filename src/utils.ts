const path = window.require('path');
const fs = window.require('fs');
const dayjs = window.require("dayjs")

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
export async function getAllFile(filePath: string) {
  let res: {
    fileName: string
    folderName: string
    createAt: string
    content: string
  }[] = []
  async function fileDisplay(filePath: string) {
    //根据文件路径读取文件，返回文件列表
    await fs.readdir(filePath, async function (err: any, files: any) {
      if (err) {
        console.warn(err, "读取文件夹错误！")
      } else {
        if (files.length < 50) {
          //遍历读取到的文件列表
          for await (const fileName of files) {
            //获取当前文件的绝对路径
            const filedir = path.join(filePath, fileName);
            //根据文件路径获取文件信息，返回一个fs.Stats对象
            fs.stat(filedir, async (eror: any, stats: any) => {
              if (eror) {
                console.warn('获取文件stats失败');
              } else {
                const isFile = stats.isFile(); //是文件
                const isDir = stats.isDirectory(); //是文件夹
                const fileobj = path.parse(filedir)
                const { ext, birthtime } = fileobj
                if (isFile && ext && ext === '.md') {
                  const folderName = filedir.match(/[^\\\/]+$/)?.[0];
                  const content = fs.readFileSync(filedir, { encoding: 'utf8' });
                  const createAt = dayjs(birthtime).format('YYYY-MM-DD')
                  res.push({
                    fileName,
                    folderName,
                    createAt,
                    content,
                  })
                }
                if (isDir) {
                  await fileDisplay(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
                }
              }
            })
          }
        }
      }
    });
  }
  await fileDisplay(filePath)
  return res
}

