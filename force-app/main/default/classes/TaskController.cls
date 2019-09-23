public with sharing class TaskController {
    @AuraEnabled(Cacheable=true)
    public static Task[] getUserTasks(String ownerId) {
        ownerId = ownerId.trim();
        return [SELECT ActivityDate,CallType,Id,Priority,Status,Subject,TaskSubtype,Type
            FROM Task 
            WHERE OwnerId = :ownerId AND Status = 'Open' AND ActivityDate != NULL
        ];
    }

}
