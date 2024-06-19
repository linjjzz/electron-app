import React, { useState, useRef, useEffect } from 'react'
import { INIT_SIDER_W } from 'src/config/config';
import classNames from 'classnames';
import { getAllFile } from 'src/utils'
import { useFileContentStore } from 'src/store'

import type { MouseEvent } from 'react';

const remote = window.require('@electron/remote');
const { ipcRenderer } = window.require("electron");

const Menu = remote.Menu;

type Props = {
  siderMouseIsOver: boolean
}

type fileDataType = {
  fileName: string
  folderName: string
  createAt: string
  content: string
}[]

const tabItems = [
  { key: '1', name: "文件" },
  { key: '2', name: "大纲" }
]

const menuTemplate = [
  // 一级菜单
  {
    label: "打开",
    // 二级菜单 submenu
  },
  {
    label: "在新窗口中打开",
  },
  // 使用分隔符不同label之间有一条横线
  {
    type: "separator"
  },
  {
    label: "新建文件",
  },
  {
    label: "新建文件夹",
  },
  // 使用分隔符不同label之间有一条横线
  {
    type: "separator"
  },
  {
    label: "重命名",
  },
  // 使用分隔符不同label之间有一条横线
  {
    type: "separator"
  },
  {
    label: "删除",
  }
];

const Sider = ({ siderMouseIsOver }: Props) => {
  const [tabActiveKey, setTabActiveKey] = useState('1')
  const [fileData, setFileData] = useState<fileDataType>([])
  const updateContent = useFileContentStore((state) => state.updateContent)

  const liRefList = useRef([]);
  const getRef = (dom: HTMLDivElement) => {
    liRefList.current.push(dom)
  }

  useEffect(() => {
    ipcRenderer.on('filePaths', (event, data) => {
      const filePath = data[0]
      console.log(filePath);
    })

    ipcRenderer.on('folderPaths', async (event, data) => {
      const filePath = data[0]
      console.log(getAllFile(filePath));
      const filedata = await getAllFile(filePath)
      console.log(filedata);

      setFileData(filedata)
    })

    return () => {
      ipcRenderer.off('filePaths', () => { })
      ipcRenderer.off('folderPaths', () => { })
    }
  }, [])



  const tabOnChnage = (key: string) => {
    setTabActiveKey(key)
  }

  const fileItemOnContextMenu = (e: MouseEvent) => {
    // 用于构建MenuItem
    let menuBuilder = Menu.buildFromTemplate(menuTemplate);
    e.preventDefault()
    menuBuilder.popup({
      window: remote.getCurrentWindow()
    })
  }

  return (
    <div className="flex flex-col h-full text-[14px]">
      <div className="flex justify-center items-center">
        <div style={{ width: INIT_SIDER_W }} className="flex items-center justify-around">
          {tabItems.map(item => (
            <div
              key={item.key}
              className={classNames('relative w-[80px] h-[32px] text-center cursor-pointer text-[#666]', item.key === tabActiveKey && 'tab_active')}
              onClick={() => tabOnChnage(item.key)}
            >
              {item.name}
            </div>
          )
          )}
        </div>
      </div>
      <div className="flex-1 flex flex-col text-[12px] overflow-auto">
        {/* {siderMouseIsOver ? tabActiveKey === '1' ? "文件内容为空" : "大纲内容为空" : ""} */}

        {fileData.length > 0 && fileData.map((item, index) => <div
          key={index}
          ref={(dom) => getRef(dom)}
          className="p-[10px] flex flex-col w-full border-b"
          onContextMenu={(e) => fileItemOnContextMenu(e)}
          onClick={() => {
            updateContent(fileData[index].content)
          }}
        >
          <div className="flex justify-between">
            <div>{item.folderName}</div>
            <div>{item.createAt}</div>
          </div>
          <div className="text-[14px] font-bold">{item.fileName}</div>
          {/* <div className="overflow-hidden text-ellipsis line-clamp-2">{item.content}</div> */}
        </div>
        )}
      </div>
    </div >
  )
}

export default Sider