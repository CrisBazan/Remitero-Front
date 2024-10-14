const { app, BrowserWindow, Menu } = require('electron/main')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: 'logoRemitero.png'
    })

    Menu.setApplicationMenu(null);

    win.loadFile('src/Inicio/InicioPagina/index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})