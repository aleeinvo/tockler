const { desktopCapturer, screen } = require('electron');
const fs = require('fs');
const path = require('path');

export class ScreenshotSerice {
    captureScreen() {
        desktopCapturer.getSources(
            {
                types: ['window', 'screen'],
                thumbnailSize: screen.getPrimaryDisplay().workAreaSize
            }
        ).then(async sources => {
            const entireScreen = sources.find(source => {
                return source.name == 'Entire Screen';
            });
    
            // mainWindow.webContents.send('screenshot-taken', entireScreen.thumbnail.toDataURL());
    
            // console.log(entireScreen.thumbnail.toDataURL());
    
            // const imageContents = Buffer.from(entireScreen.thumbnail.toPNG()).toString('base64');
    
            const captureDir = path.join(__dirname, 'captures');
    
            if(!fs.existsSync(captureDir)) {
                fs.mkdirSync(captureDir);
            }
    
            const capturePath = path.join(__dirname, `captures/${Date.now()}.png`);
            fs.writeFile(capturePath, entireScreen.thumbnail.toPNG(), error => {
                if (error) {
                    console.log(error.message);
                    return;
                }
    
                // mainWindow.webContents.send('screenshot-taken', {
                //     src: capturePath,
                //     timestamp: fs.lstatSync(capturePath).ctime
                // });
            });
        });
    }
}

export const screenshotService = new ScreenshotSerice();