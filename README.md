# PDF 操作工具 PDF Manipulation Tool

该项目是一个 Web 应用程序，允许用户上传 PDF 文件、旋转其页面、放大/缩小以及下载修改后的版本。它使用 React、用于呈现 PDF 的 `react-pdf` 和用于操作 PDF 页面的 `pdf-lib` 构建。
This project is a web application that allows users to upload a PDF file, rotate its pages, zoom in/out, and download the modified version. It is built using React, `react-pdf` for rendering the PDF, and `pdf-lib` for manipulating the PDF pages.

## 功能 Features

- 上传 PDF 文件。Upload PDF files.
- 旋转 PDF 页面。Rotate PDF pages.
- 放大/缩小 PDF 页面。Zoom in/out of PDF pages.
- 下载修改后的 PDF。Download the modified PDF.

## 使用的技术 Technologies Used

- **React**：用于构建用户界面。For building the user interface.
- **react-pdf**：用于在 React 应用程序内呈现 PDF 文档。For rendering PDF documents within the React application.
- **pdf-lib**：用于操作 PDF 页面，例如旋转和合并 PDF。For manipulating PDF pages, such as rotating and merging PDFs.
- **JavaScript**：使用的主要编程语言。The primary programming language used.
- **npm**：用于管理依赖项和运行开发服务器。For managing dependencies and running the development server.

## 入门 Getting Started

### 先决条件 Prerequisites

确保您的机器上安装了以下内容：
Make sure you have the following installed on your machine:

- **Node.js**：[下载 Node.js](https://nodejs.org/)（建议使用版本 16 或更高版本）[Download Node.js](https://nodejs.org/) (Version 16 or above is recommended)
- **npm**：随 Node.js 一起提供 Comes with Node.js

### 安装 Installation

1. 克隆存储库：Clone the repository

```bash
git clone https://github.com/your-username/pdf-manipulation-tool.git
```
2. 导航到项目目录：Navigate to the project directory

```bash
cd pdf-manipulation-tool
```

3. 安装依赖项：Install dependencies

```bash
npm install
```

4. 以开发模式运行项目：Run the project in development mode

```bash
npm run dev
```

该应用程序将在 http://localhost:3000 上可用。
The app will be available at http://localhost:3000.

### 使用 Usage

1. 在浏览器中打开 Web 应用程序。Open the web application in your browser.

2. 单击“上传”按钮上传 PDF 文件。Upload a PDF file by clicking the Upload button.

3. 根据需要使用旋转和缩放按钮操作 PDF。Use the rotate and zoom buttons to manipulate the PDF as needed.

4. 完成后，单击“下载”按钮将修改后的 PDF 保存到您的设备。Once finished, click the Download button to save the modified PDF to your device.

### 测试 Testing

我使用手动测试来测试功能，例如上传不同的 PDF 文件、旋转页面、放大/缩小，并验证下载的 PDF 是否反映了修改。
I use manual testing to test the functionalities, like Upload different PDF files, rotate pages, zoom in/out, and verify that the resulting downloaded PDF reflects the modifications.

### 未来改进 Future Improvements

- 添加对注释 PDF 的支持。Add support for annotating PDFs.
- 包括其他编辑选项，例如重新排列页面。Include additional editing options, like rearranging pages.
- 优化处理较大 PDF 文件的性能。Optimize performance for handling larger PDF files.