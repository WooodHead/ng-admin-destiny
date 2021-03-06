import moment from 'moment';
import showTemplate from './showtemplate.html';

var fromNow = v => moment(v).fromNow();


export default function (nga, admin) {
    
    var myaccount = admin.getEntity('myaccount');
    
    myaccount.url(function(entityName, viewType, identifierValue, identifierName) {
      return 'https://www.bungie.net/Platform/User/GetCurrentBungieAccount/';
        
    });
    
    myaccount.listView()
        .title('My Account')
        .fields([
        
                nga.field('','template').label('')
                    .template('<span ng-if="entry.values.message">Login to Bungie.net&nbsp;<button ng-controller="BungieRedirect" ng-click="goBungie()">Go</button>'),
//                nga.field('').label('')
//                    .template('<img  ng-if="entry.values[\'userInfo.iconPath\']" src="http://www.bungie.net{{ entry.values[\'userInfo.iconPath\'] }}" height="42" width="42" />'),
                nga.field('userInfo.displayName').label('Name'),
                nga.field('grimoireScore').label('Grimoire Score'),
                nga.field('', 'template').label('').template('<ma-filtered-list-button  ng-if="!entry.values.message" entity-name="vault" filter="{ platformid: entry.values[\'userInfo.membershipType\'],characterid:entry.values[\'characters\'][0].characterId,memberid:entry.values[\'userInfo.membershipId\'],sortField:\'primaryStat\' }" label="Vault" size="sm"></ma-filtered-list-button>'),
                nga.field('', 'template').label('').template('<ma-filtered-list-button  ng-if="!entry.values.message" entity-name="characters" filter="{ platformid: entry.values[\'userInfo.membershipType\'],memberid:entry.values[\'userInfo.membershipId\'] }" label="Characters Public" size="sm"></ma-filtered-list-button>'),
                nga.field('characters', 'embedded_list').label('Characters Private')
                    .targetFields([ 
                        nga.field('').label('')
                    .template('<img src="http://www.bungie.net{{ entry.values.emblemPath }}" height="42" width="42" />'),
                        nga.field('characterClass.className').label('Class'),
                        nga.field('level').label('Level'),
                        nga.field('powerLevel').label('Light'),
                        nga.field('', 'template').label('').template('<ma-filtered-list-button entity-name="inventory" filter="{platformid: entry.values.membershipType,memberid:entry.values.membershipId,characterid: entry.values.characterId }" label="Inventory" size="sm"></ma-filtered-list-button>'),
                        nga.field('', 'template').label('').template('<ma-filtered-list-button entity-name="vendors" filter="{platformid: entry.values.membershipType,characterid: entry.values.characterId }" label="Vendors" size="sm"></ma-filtered-list-button>'),
                    ])
                //nga.field('').label('').template("<div> {{ entry.values }} </div>"),
        ])
    .actions(['back'])
    .batchActions([]);
    
    myaccount.showView()
        .title('My Account')
        .fields([
                nga.field('destinyAccounts', 'embedded_list')
                    .targetFields([
                        nga.field('userInfo.iconPath'),
                        nga.field('userInfo.membershipId'),
                        nga.field('userInfo.membershipType'),
                        nga.field('userInfo.displayName'),
                        nga.field('grimoireScore'),
                        nga.field('characters', 'embedded_list')
                            .targetFields([
                                nga.field('characterId'),
                                nga.field('membershipId'),
                                nga.field('membershipType'),
                                nga.field('race.raceName'),
                                nga.field('gender.genderName'),
                                nga.field('characterClass.className'),
                                nga.field('levelProgression.level'),
                            ])
                    ])
        ])
    .actions(['back']).template(showTemplate);
    
    return myaccount;
    
}
