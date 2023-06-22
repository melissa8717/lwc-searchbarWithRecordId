/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 06-09-2023
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class OppController {

    @AuraEnabled(cacheable=true)
    public static List<Opportunity> findOpp(Id accId,String searchKey) {
        String key = '%' + searchKey + '%';
        return [
            SELECT Id, Name, Amount, AccountId, CloseDate
            FROM Opportunity
            WHERE Name LIKE :key AND AccountId = :accId
            WITH SECURITY_ENFORCED
            LIMIT 10
        ];
    }

}