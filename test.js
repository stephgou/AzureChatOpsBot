dict=JSON.parse('[ { "id": "/subscriptions/b1256985-d559-406d-a0ca-f47d72fed1e2/resourceGroups/SG-RG-INTERNAL-COGNITIVE/providers/Microsoft.Compute/virtualMachines/testvm1094","name": "testvm1094"}]');
var json = '[{"result":true,"count":1}]';
obj = JSON.parse(json);
console.log(dict[0]["name"]);
