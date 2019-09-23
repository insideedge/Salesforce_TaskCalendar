# Salesforce Lightning Web Component Calendar in FullCalendarJS

Pulls a user's currently open tasks and displays them in a 1-week view as a Lightning Web Component.  Includes tiny Apex class to pull user's tasks.

Uses FullCalendarJS: [https://fullcalendar.io/](https://fullcalendar.io/)

Adapted from: [https://github.com/jh-salesforce-dev/lwcCalendar](https://github.com/jh-salesforce-dev/lwcCalendar)

Opens tasks on click in Sales Console tabs.


![Calendar Sample](https://raw.githubusercontent.com/insideedge/Salesforce_TaskCalendar/master/sample_image.png)

## How to Deploy in 5 Minutes
I'm writing this section in 5 minutes, not that it should only take you 5 minutes.
1. Clone this repo to your machine and open in VS Code.
2. Modify the *TestTaskController* Apex test class to use a RecordTypeId associated with Tasks in your org.
3. If you use Sandbox to Production deployments, use the command `SFDX: Authorize an Org` select *Sandbox* and input a URL for a Sandbox connected to your Production org.  If you use scratch orgs or something more fancy, you probably don't need to be reading these directions.
4. Right-click the *force-app* folder in VS Code and select `SFDX: Deploy Source to Org`
5. Run the Apex tests either in the Sandbox web interface (`SFDX: Open Default Org`) or from VS Code (`SFDX: Invoke Apex Tests...`)
6. Fix any errors that came up in VS Code, redeploy code and retest.
7. Place the component on any Lightning page you'd like, such as the home page.  Make changes as desired, repeat 4-6.
8. Open the web interface for the Sandbox (`SFDX: Open Default Org`), open Setup and search for *Outbound Change Sets* in the quick find box.
9. Build your change set(s), upload to production.
10. In your production system, open Setup and search for *Inbound Change Sets* in the quick find box.  Validate and deploy the change sets.


## Need help?
Feel free to raise an issue here and we'll do our best to provide guidance, time allowing.
