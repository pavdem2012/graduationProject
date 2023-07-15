window.jest_html_reporters_callback__({"numFailedTestSuites":1,"numFailedTests":1,"numPassedTestSuites":1,"numPassedTests":18,"numPendingTestSuites":0,"numPendingTests":0,"numRuntimeErrorTestSuites":0,"numTodoTests":0,"numTotalTestSuites":2,"numTotalTests":19,"startTime":1689437994696,"success":false,"testResults":[{"numFailingTests":1,"numPassingTests":7,"numPendingTests":0,"numTodoTests":0,"perfStats":{"end":1689437999450,"runtime":4705,"slow":false,"start":1689437994745},"testFilePath":"/home/runner/work/graduationProject/graduationProject/src/tests/api/api_tests_user.spec.js","failureMessage":"  ● userTests › POST To Create/Register User Account\n\n    expect(received).toEqual(expected) // deep equality\n\n    Expected: 201\n    Received: 200\n\n      39 |     formData.append('title', 'Mr')\n      40 |     response = await universUserController({ path: '/createAccount', method: 'post', formData })\n    > 41 |     expect(response.status).toEqual(201)\n         |                             ^\n      42 |     expect(response.statusText).toBe('OK')\n      43 |     expect(response.data.responseCode).toBeDefined()\n      44 |     expect(response.data.responseCode).toEqual(201)\n\n      at toEqual (src/tests/api/api_tests_user.spec.js:41:29)\n      at call (src/tests/api/api_tests_user.spec.js:2:1)\n      at Generator.tryCatch (src/tests/api/api_tests_user.spec.js:2:1)\n      at Generator._invoke [as next] (src/tests/api/api_tests_user.spec.js:2:1)\n      at asyncGeneratorStep (src/tests/api/api_tests_user.spec.js:2:1)\n      at asyncGeneratorStep (src/tests/api/api_tests_user.spec.js:2:1)\n","testResults":[{"ancestorTitles":["userTests"],"duration":245,"failureMessages":["Error: expect(received).toEqual(expected) // deep equality\n\nExpected: 201\nReceived: 200\n    at toEqual (/home/runner/work/graduationProject/graduationProject/src/tests/api/api_tests_user.spec.js:41:29)\n    at call (/home/runner/work/graduationProject/graduationProject/src/tests/api/api_tests_user.spec.js:2:1)\n    at Generator.tryCatch (/home/runner/work/graduationProject/graduationProject/src/tests/api/api_tests_user.spec.js:2:1)\n    at Generator._invoke [as next] (/home/runner/work/graduationProject/graduationProject/src/tests/api/api_tests_user.spec.js:2:1)\n    at asyncGeneratorStep (/home/runner/work/graduationProject/graduationProject/src/tests/api/api_tests_user.spec.js:2:1)\n    at asyncGeneratorStep (/home/runner/work/graduationProject/graduationProject/src/tests/api/api_tests_user.spec.js:2:1)\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)"],"fullName":"userTests POST To Create/Register User Account","status":"failed","title":"POST To Create/Register User Account"},{"ancestorTitles":["userTests"],"duration":131,"failureMessages":[],"fullName":"userTests POST To Verify Login with valid details","status":"passed","title":"POST To Verify Login with valid details"},{"ancestorTitles":["userTests"],"duration":89,"failureMessages":[],"fullName":"userTests POST To Verify Login without email parameter","status":"passed","title":"POST To Verify Login without email parameter"},{"ancestorTitles":["userTests"],"duration":92,"failureMessages":[],"fullName":"userTests DELETE To Verify Login","status":"passed","title":"DELETE To Verify Login"},{"ancestorTitles":["userTests"],"duration":93,"failureMessages":[],"fullName":"userTests POST To Verify Login with invalid details","status":"passed","title":"POST To Verify Login with invalid details"},{"ancestorTitles":["userTests"],"duration":133,"failureMessages":[],"fullName":"userTests PUT METHOD To Update User Account","status":"passed","title":"PUT METHOD To Update User Account"},{"ancestorTitles":["userTests"],"duration":95,"failureMessages":[],"fullName":"userTests GET user account detail by email","status":"passed","title":"GET user account detail by email"},{"ancestorTitles":["userTests"],"duration":66,"failureMessages":[],"fullName":"userTests DELETE METHOD To Delete User Account","status":"passed","title":"DELETE METHOD To Delete User Account"}]},{"numFailingTests":0,"numPassingTests":11,"numPendingTests":0,"numTodoTests":0,"perfStats":{"end":1689438001219,"runtime":1759,"slow":false,"start":1689437999460},"testFilePath":"/home/runner/work/graduationProject/graduationProject/src/tests/api/api_tests_catalog.spec.js","failureMessage":null,"testResults":[{"ancestorTitles":["API products&brands tests"],"duration":178,"failureMessages":[],"fullName":"API products&brands tests Get All Products List","status":"passed","title":"Get All Products List"},{"ancestorTitles":["API products&brands tests"],"duration":99,"failureMessages":[],"fullName":"API products&brands tests POST To All Products List","status":"passed","title":"POST To All Products List"},{"ancestorTitles":["API products&brands tests"],"duration":104,"failureMessages":[],"fullName":"API products&brands tests Get All Brands List","status":"passed","title":"Get All Brands List"},{"ancestorTitles":["API products&brands tests"],"duration":59,"failureMessages":[],"fullName":"API products&brands tests PUT To All Brands List","status":"passed","title":"PUT To All Brands List"},{"ancestorTitles":["API products&brands tests"],"duration":116,"failureMessages":[],"fullName":"API products&brands tests POST To Search Product by \"top\"","status":"passed","title":"POST To Search Product by \"top\""},{"ancestorTitles":["API products&brands tests"],"duration":107,"failureMessages":[],"fullName":"API products&brands tests POST To Search Product by \"tshirt\"","status":"passed","title":"POST To Search Product by \"tshirt\""},{"ancestorTitles":["API products&brands tests"],"duration":99,"failureMessages":[],"fullName":"API products&brands tests POST To Search Product by \"jean\"","status":"passed","title":"POST To Search Product by \"jean\""},{"ancestorTitles":["API products&brands tests"],"duration":124,"failureMessages":[],"fullName":"API products&brands tests POST To Search Product by \"dress\"","status":"passed","title":"POST To Search Product by \"dress\""},{"ancestorTitles":["API products&brands tests"],"duration":96,"failureMessages":[],"fullName":"API products&brands tests POST To Search Product by \"saree\"","status":"passed","title":"POST To Search Product by \"saree\""},{"ancestorTitles":["API products&brands tests"],"duration":102,"failureMessages":[],"fullName":"API products&brands tests POST To Search Product by \"sleeves\"","status":"passed","title":"POST To Search Product by \"sleeves\""},{"ancestorTitles":["API products&brands tests"],"duration":97,"failureMessages":[],"fullName":"API products&brands tests POST To Search Product without search_product parameter","status":"passed","title":"POST To Search Product without search_product parameter"}]}],"config":{"bail":0,"changedFilesWithAncestor":false,"ci":true,"collectCoverage":false,"collectCoverageFrom":[],"coverageDirectory":"/home/runner/work/graduationProject/graduationProject/coverage","coverageProvider":"babel","coverageReporters":["json","text","lcov","clover"],"detectLeaks":false,"detectOpenHandles":false,"errorOnDeprecated":false,"expand":false,"findRelatedTests":false,"forceExit":false,"json":false,"lastCommit":false,"listTests":false,"logHeapUsage":false,"maxConcurrency":5,"maxWorkers":1,"noStackTrace":false,"nonFlagArgs":["src/tests/api/api_tests_catalog.spec.js","src/tests/api/api_tests_user.spec.js"],"notify":false,"notifyMode":"failure-change","onlyChanged":false,"onlyFailures":false,"openHandlesTimeout":1000,"passWithNoTests":false,"projects":[],"reporters":[["default",{}],["/home/runner/work/graduationProject/graduationProject/node_modules/jest-html-reporters/index.js",{"publicPath":"./reports/jest/","filename":"index.html","openReport":true}]],"rootDir":"/home/runner/work/graduationProject/graduationProject","runTestsByPath":false,"seed":1772942217,"skipFilter":false,"snapshotFormat":{"escapeString":false,"printBasicPrototype":false},"testFailureExitCode":1,"testPathPattern":"src/tests/api/api_tests_catalog.spec.js|src/tests/api/api_tests_user.spec.js","testSequencer":"/home/runner/work/graduationProject/graduationProject/node_modules/@jest/test-sequencer/build/index.js","updateSnapshot":"none","useStderr":false,"verbose":true,"watch":false,"watchAll":false,"watchman":true,"workerThreads":false},"endTime":1689438001223,"_reporterOptions":{"publicPath":"./reports/jest/","filename":"index.html","expand":false,"pageTitle":"","hideIcon":false,"testCommand":"","openReport":true,"failureMessageOnly":0,"enableMergeData":false,"dataMergeLevel":1,"inlineSource":false,"urlForTestFiles":"","darkTheme":false,"includeConsoleLog":false},"logInfoMapping":{},"attachInfos":{}})