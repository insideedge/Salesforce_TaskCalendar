/* eslint-disable no-console */
import { LightningElement, wire, track } from 'lwc';
import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';
import getUserTasks from '@salesforce/apex/TaskController.getUserTasks';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import FullCalendarJS from '@salesforce/resourceUrl/FullCalendarJS';
import Id from '@salesforce/user/Id';

export default class Tasksbyweek extends NavigationMixin(LightningElement) {
    @track tasks;
    @wire(CurrentPageReference) pageRef;
    currentUser = Id;
    fullCalendarJsInitialised = false;

    /**
     * @description Standard lifecyle method 'renderedCallback'
     *              Ensures that the page loads and renders the 
     *              container before doing anything else
     */
    async renderedCallback() {

        await this.loadTasks(this.currentUser);

        // Performs this operation only on first render
        if (this.fullCalendarJsInitialised) {
            return;
        }
        this.fullCalendarJsInitialised = true;

        // Executes all loadScript and loadStyle promises
        // and only resolves them once all promises are done
        Promise.all([
            loadScript(this, FullCalendarJS + '/jquery.min.js'),
            loadScript(this, FullCalendarJS + '/moment.min.js'),
            loadScript(this, FullCalendarJS + '/fullcalendar.min.js'),
            loadStyle(this, FullCalendarJS + '/fullcalendar.min.css'),
            // loadStyle(this, FullCalendarJS + '/fullcalendar.print.min.css')
        ])
            .then(() => {
                // Initialise the calendar configuration
                this.initialiseFullCalendarJs(this.tasks, this);
            })
            .catch(error => {
                // eslint-disable-next-line no-console
                console.error({
                    message: 'Error occured on FullCalendarJS',
                    error
                });
            })
    }

    async loadTasks(userId) {
        try {
            console.log(userId);
            let eventArr = [];
            let taskArr = [];
            taskArr = await getUserTasks({ ownerId: userId });
            taskArr.forEach(function(key) {
                let eventColor = '#1A687E';
                let fontColor = '#ffffff';
                if (key.Priority === 'High') {
                    eventColor = '#e47237';
                    fontColor = '#000000';
                }
                eventArr.push({
                    'id':key.Id,
                    'start':key.ActivityDate,
                    'title':key.Subject,
                    'backgroundColor': eventColor,
                    'textColor': fontColor
                });
            });
            this.tasks = eventArr;
        } catch(error) {
            console.error({
                message: 'Error occured in task loading',
                error
            });
        }
    }

    

    /**
     * @description Initialise the calendar configuration
     *              This is where we configure the available options for the calendar.
     *              This is also where we load the Events data.
     */
    initialiseFullCalendarJs(eventData, theWindow) {
        
        const ele = this.template.querySelector('div.fullcalendarjs');
        let now = new Date();
        // eslint-disable-next-line no-undef
        $(ele).fullCalendar({
            header: {
                left: 'basicWeek,month',
                center: 'title',
                right: 'today prev,next addNewTask'
            },
            buttonText: {
                month: 'Month',
                basicWeek: 'Week',
                prev: 'Prev',
                next: 'Next',
                today: 'Today'
            },
            customButtons: {
                addNewTask: {
                    text: 'New Task',
                    click: function() {
                        theWindow.navigateToNewTask();
                    }
                }
            },
            defaultView: 'basicWeek',
            defaultDate: now,
            navLinks: true, // can click day/week names to navigate views
            editable: false,
            eventLimit: true, // allow "more" link when too many events
            height: 450,
            events: eventData,
            eventClick: function(info) {
                theWindow.navigateToTask(info);
            }

        });
    }

    navigateToTask(info) {
        var taskId = info.id;
        console.log(taskId);
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: taskId,
                objectApiName: 'Task',
                actionName: 'view',
            },
        });
    }

    navigateToNewTask() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Task',
                actionName: 'new'
            }
        });
    }
}