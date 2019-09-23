@isTest
public with sharing class Test_TaskController {
    public static testmethod void TestTaskController() {
        String ownerId = UserInfo.getUserId();
        Date duedate = Date.today();
        Task tsk = new Task( RecordTypeId = '0121I000000aQVQQA2'
                            , Subject = 'test task note'
                            , Status = 'Open'
                            , Description = 'blah blah blah'
                            , Type = 'Note'
                            , OwnerId = ownerId
                            , ActivityDate = duedate);
        insert tsk;
        

        Test.startTest();
        
        list<task> notes = TaskController.getUserTasks(ownerId);
        
        Test.stopTest();
        
        System.assertNotEquals(notes.size(), 0);
    }
}
