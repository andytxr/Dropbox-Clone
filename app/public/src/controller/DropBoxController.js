class DropBoxController {

    constructor(){

        this.btnSendFileEl = document.getElementById('btn-send-file');
        this.inputFilesEl = document.getElementById('files');
        this.snackModalEl = document.getElementById('react-snackbar-root');
        this.progressBarEl = this.snackModalEl.querySelector('.mc-progress-bar-fg');
        this.nameFileEl = this.snackModalEl.querySelector('.filename');
        this.timeLeftEl = this.snackModalEl.querySelector('.timeleft');

        this.initEvents();

    }

    //Iniciando eventos

    initEvents(){

        this.btnSendFileEl.addEventListener('click', event =>{

            this.inputFilesEl.click();

        })

        this.inputFilesEl.addEventListener('change', event =>{

            this.uploadTasks(event.target.files);

            this.snackModalEl.style.display='block';

        })

    }

    //Funcionalidade de Upload

    uploadTasks(files){

        let promises = [];

        [...files].forEach(file=>{

            promises.push(new Promise((resolve, reject)=>{

                let ajax = new XMLHttpRequest();
                ajax.open('POST', '/upload');
                ajax.onload=event=>{

                    try{

                        resolve(JSON.parse(ajax.responseText));

                    }catch(e){

                        reject(e);

                    }

                }

                ajax.onerror=event=>{

                    reject(event);

                }

                ajax.upload.onprogress = event=>{

                    this.uploadProgress(event, file);

                };

                let formData= new FormData();
                formData.append('input-file', file)
                this.startUpTime = Date.now();

                ajax.send(formData);

            }));

        })

        return Promise.all(promises);

    }

    uploadProgress(event, file){

        let loaded = event.loaded;
        let total = event.total;
        let porcent = parseInt((loaded/total)*100);

        let timespent = Date.now() - this.startUpTime;
        let timeleft = ((100 - porcent)*timespent)/porcent;
        

        this.progressBarEl.style.width=`${porcent}%`;
        this.nameFileEl.innerHTML=file.name;
        this.timeLeftEl.innerHTML= this.formatTime(timeleft);

        console.log(timespent, timeleft, porcent);

    }

    formatTime(duration){

        let sec = parseInt((duration/1000)%60);
        let min = parseInt(duration*(1000*60)%60);
        let hours = parseInt(duration*(1000*60*60)%24);

        if(hours > 0){
            return `${hours} horas, ${min} minutos e ${sec} segundos.`
        } else if(min>0){
            return `${min} minutos e ${sec} segundos.`
        }
        else if(sec>0){
            return `${sec} segundos.`
        }

        return '';



    }
}
