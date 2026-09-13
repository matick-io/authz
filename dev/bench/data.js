window.BENCHMARK_DATA = {
  "lastUpdate": 1789319340626,
  "repoUrl": "https://github.com/matick-io/authz",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "email": "storm@khaos.systems",
            "name": "Storm Søndergaard",
            "username": "stormsc1"
          },
          "committer": {
            "email": "storm@khaos.systems",
            "name": "Storm Søndergaard",
            "username": "stormsc1"
          },
          "distinct": true,
          "id": "0173d0099fc6e249fe141223045d4fb0831bf433",
          "message": "fix: a userset is a member of itself for permissions too, in the walk and the index\n\nThe long differential pass found the walk and the index disagreeing on a\nsubject whose relation is a permission, and the walk disagreeing with\nitself: CheckPermission applied \"a userset is a member of itself\" to\npermissions, the two lookups only to relations. The walk now applies it in\nall three directions. The index stores a permission-level set for every\narrow target and counts the permission itself among a resource's\nschema-derived sets, so it answers the same. Four hundred rounds of random\nwrites and questions per datastore kind now agree with the walk.",
          "timestamp": "2026-09-13T18:23:15+02:00",
          "tree_id": "3b86205c854a34ffe1e9de6a021b8272a1d86f5d",
          "url": "https://github.com/matick-io/authz/commit/0173d0099fc6e249fe141223045d4fb0831bf433"
        },
        "date": 1789319181313,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkScenarios/wide_team/memory/check_hit",
            "value": 4253760,
            "unit": "ns/op\t  608673 B/op\t      32 allocs/op",
            "extra": "284 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/check_hit - ns/op",
            "value": 4253760,
            "unit": "ns/op",
            "extra": "284 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/check_hit - B/op",
            "value": 608673,
            "unit": "B/op",
            "extra": "284 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/check_hit - allocs/op",
            "value": 32,
            "unit": "allocs/op",
            "extra": "284 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/check_miss",
            "value": 4267176,
            "unit": "ns/op\t  608019 B/op\t      35 allocs/op",
            "extra": "272 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/check_miss - ns/op",
            "value": 4267176,
            "unit": "ns/op",
            "extra": "272 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/check_miss - B/op",
            "value": 608019,
            "unit": "B/op",
            "extra": "272 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/check_miss - allocs/op",
            "value": 35,
            "unit": "allocs/op",
            "extra": "272 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/lookup_one_member",
            "value": 1082637,
            "unit": "ns/op\t    7199 B/op\t     130 allocs/op",
            "extra": "1113 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/lookup_one_member - ns/op",
            "value": 1082637,
            "unit": "ns/op",
            "extra": "1113 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/lookup_one_member - B/op",
            "value": 7199,
            "unit": "B/op",
            "extra": "1113 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/lookup_one_member - allocs/op",
            "value": 130,
            "unit": "allocs/op",
            "extra": "1113 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/subjects_all",
            "value": 5177924,
            "unit": "ns/op\t 1300861 B/op\t     140 allocs/op",
            "extra": "230 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/subjects_all - ns/op",
            "value": 5177924,
            "unit": "ns/op",
            "extra": "230 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/subjects_all - B/op",
            "value": 1300861,
            "unit": "B/op",
            "extra": "230 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/subjects_all - allocs/op",
            "value": 140,
            "unit": "allocs/op",
            "extra": "230 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/bulk_200",
            "value": 6844843,
            "unit": "ns/op\t  713761 B/op\t    1627 allocs/op",
            "extra": "175 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/bulk_200 - ns/op",
            "value": 6844843,
            "unit": "ns/op",
            "extra": "175 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/bulk_200 - B/op",
            "value": 713761,
            "unit": "B/op",
            "extra": "175 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/bulk_200 - allocs/op",
            "value": 1627,
            "unit": "allocs/op",
            "extra": "175 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/toggle_grant",
            "value": 423702,
            "unit": "ns/op\t  988979 B/op\t      29 allocs/op",
            "extra": "2700 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/toggle_grant - ns/op",
            "value": 423702,
            "unit": "ns/op",
            "extra": "2700 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/toggle_grant - B/op",
            "value": 988979,
            "unit": "B/op",
            "extra": "2700 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/toggle_grant - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "2700 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/check_hit",
            "value": 2383252,
            "unit": "ns/op\t 1057348 B/op\t   14082 allocs/op",
            "extra": "472 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/check_hit - ns/op",
            "value": 2383252,
            "unit": "ns/op",
            "extra": "472 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/check_hit - B/op",
            "value": 1057348,
            "unit": "B/op",
            "extra": "472 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/check_hit - allocs/op",
            "value": 14082,
            "unit": "allocs/op",
            "extra": "472 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/check_miss",
            "value": 2534635,
            "unit": "ns/op\t 1058870 B/op\t   14103 allocs/op",
            "extra": "469 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/check_miss - ns/op",
            "value": 2534635,
            "unit": "ns/op",
            "extra": "469 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/check_miss - B/op",
            "value": 1058870,
            "unit": "B/op",
            "extra": "469 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/check_miss - allocs/op",
            "value": 14103,
            "unit": "allocs/op",
            "extra": "469 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/lookup_one_member",
            "value": 9227563,
            "unit": "ns/op\t   46366 B/op\t     745 allocs/op",
            "extra": "128 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/lookup_one_member - ns/op",
            "value": 9227563,
            "unit": "ns/op",
            "extra": "128 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/lookup_one_member - B/op",
            "value": 46366,
            "unit": "B/op",
            "extra": "128 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/lookup_one_member - allocs/op",
            "value": 745,
            "unit": "allocs/op",
            "extra": "128 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/subjects_all",
            "value": 3589071,
            "unit": "ns/op\t 1747690 B/op\t   14208 allocs/op",
            "extra": "314 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/subjects_all - ns/op",
            "value": 3589071,
            "unit": "ns/op",
            "extra": "314 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/subjects_all - B/op",
            "value": 1747690,
            "unit": "B/op",
            "extra": "314 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/subjects_all - allocs/op",
            "value": 14208,
            "unit": "allocs/op",
            "extra": "314 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/bulk_200",
            "value": 5174220,
            "unit": "ns/op\t 1159945 B/op\t   15695 allocs/op",
            "extra": "232 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/bulk_200 - ns/op",
            "value": 5174220,
            "unit": "ns/op",
            "extra": "232 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/bulk_200 - B/op",
            "value": 1159945,
            "unit": "B/op",
            "extra": "232 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/bulk_200 - allocs/op",
            "value": 15695,
            "unit": "allocs/op",
            "extra": "232 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/toggle_grant",
            "value": 2038956,
            "unit": "ns/op\t    8118 B/op\t     145 allocs/op",
            "extra": "588 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/toggle_grant - ns/op",
            "value": 2038956,
            "unit": "ns/op",
            "extra": "588 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/toggle_grant - B/op",
            "value": 8118,
            "unit": "B/op",
            "extra": "588 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/toggle_grant - allocs/op",
            "value": 145,
            "unit": "allocs/op",
            "extra": "588 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/check_hit",
            "value": 716293,
            "unit": "ns/op\t    4052 B/op\t      53 allocs/op",
            "extra": "1729 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/check_hit - ns/op",
            "value": 716293,
            "unit": "ns/op",
            "extra": "1729 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/check_hit - B/op",
            "value": 4052,
            "unit": "B/op",
            "extra": "1729 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/check_hit - allocs/op",
            "value": 53,
            "unit": "allocs/op",
            "extra": "1729 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/check_miss",
            "value": 1091522,
            "unit": "ns/op\t    6408 B/op\t      74 allocs/op",
            "extra": "1052 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/check_miss - ns/op",
            "value": 1091522,
            "unit": "ns/op",
            "extra": "1052 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/check_miss - B/op",
            "value": 6408,
            "unit": "B/op",
            "extra": "1052 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/check_miss - allocs/op",
            "value": 74,
            "unit": "allocs/op",
            "extra": "1052 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/lookup_one_member",
            "value": 1005281,
            "unit": "ns/op\t    2707 B/op\t      53 allocs/op",
            "extra": "1184 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/lookup_one_member - ns/op",
            "value": 1005281,
            "unit": "ns/op",
            "extra": "1184 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/lookup_one_member - B/op",
            "value": 2707,
            "unit": "B/op",
            "extra": "1184 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/lookup_one_member - allocs/op",
            "value": 53,
            "unit": "allocs/op",
            "extra": "1184 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/subjects_all",
            "value": 10330782,
            "unit": "ns/op\t 1533102 B/op\t   14139 allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/subjects_all - ns/op",
            "value": 10330782,
            "unit": "ns/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/subjects_all - B/op",
            "value": 1533102,
            "unit": "B/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/subjects_all - allocs/op",
            "value": 14139,
            "unit": "allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/bulk_200",
            "value": 123202741,
            "unit": "ns/op\t  985005 B/op\t   10913 allocs/op",
            "extra": "9 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/bulk_200 - ns/op",
            "value": 123202741,
            "unit": "ns/op",
            "extra": "9 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/bulk_200 - B/op",
            "value": 985005,
            "unit": "B/op",
            "extra": "9 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/bulk_200 - allocs/op",
            "value": 10913,
            "unit": "allocs/op",
            "extra": "9 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/toggle_grant",
            "value": 2014029,
            "unit": "ns/op\t    8199 B/op\t     145 allocs/op",
            "extra": "586 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/toggle_grant - ns/op",
            "value": 2014029,
            "unit": "ns/op",
            "extra": "586 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/toggle_grant - B/op",
            "value": 8199,
            "unit": "B/op",
            "extra": "586 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/toggle_grant - allocs/op",
            "value": 145,
            "unit": "allocs/op",
            "extra": "586 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/check_hit",
            "value": 456315,
            "unit": "ns/op\t    1360 B/op\t      30 allocs/op",
            "extra": "2502 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/check_hit - ns/op",
            "value": 456315,
            "unit": "ns/op",
            "extra": "2502 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/check_hit - B/op",
            "value": 1360,
            "unit": "B/op",
            "extra": "2502 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/check_hit - allocs/op",
            "value": 30,
            "unit": "allocs/op",
            "extra": "2502 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/check_miss",
            "value": 445026,
            "unit": "ns/op\t    1339 B/op\t      30 allocs/op",
            "extra": "2707 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/check_miss - ns/op",
            "value": 445026,
            "unit": "ns/op",
            "extra": "2707 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/check_miss - B/op",
            "value": 1339,
            "unit": "B/op",
            "extra": "2707 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/check_miss - allocs/op",
            "value": 30,
            "unit": "allocs/op",
            "extra": "2707 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/lookup_one_member",
            "value": 453929,
            "unit": "ns/op\t    1697 B/op\t      33 allocs/op",
            "extra": "2596 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/lookup_one_member - ns/op",
            "value": 453929,
            "unit": "ns/op",
            "extra": "2596 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/lookup_one_member - B/op",
            "value": 1697,
            "unit": "B/op",
            "extra": "2596 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/lookup_one_member - allocs/op",
            "value": 33,
            "unit": "allocs/op",
            "extra": "2596 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/subjects_all",
            "value": 4551586,
            "unit": "ns/op\t  431464 B/op\t    6076 allocs/op",
            "extra": "262 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/subjects_all - ns/op",
            "value": 4551586,
            "unit": "ns/op",
            "extra": "262 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/subjects_all - B/op",
            "value": 431464,
            "unit": "B/op",
            "extra": "262 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/subjects_all - allocs/op",
            "value": 6076,
            "unit": "allocs/op",
            "extra": "262 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/bulk_200",
            "value": 38297773,
            "unit": "ns/op\t  216355 B/op\t    4210 allocs/op",
            "extra": "30 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/bulk_200 - ns/op",
            "value": 38297773,
            "unit": "ns/op",
            "extra": "30 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/bulk_200 - B/op",
            "value": 216355,
            "unit": "B/op",
            "extra": "30 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/bulk_200 - allocs/op",
            "value": 4210,
            "unit": "allocs/op",
            "extra": "30 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/toggle_grant",
            "value": 2976333,
            "unit": "ns/op\t   10176 B/op\t     209 allocs/op",
            "extra": "415 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/toggle_grant - ns/op",
            "value": 2976333,
            "unit": "ns/op",
            "extra": "415 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/toggle_grant - B/op",
            "value": 10176,
            "unit": "B/op",
            "extra": "415 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/toggle_grant - allocs/op",
            "value": 209,
            "unit": "allocs/op",
            "extra": "415 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/check_hit",
            "value": 297375,
            "unit": "ns/op\t   36635 B/op\t     531 allocs/op",
            "extra": "3860 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/check_hit - ns/op",
            "value": 297375,
            "unit": "ns/op",
            "extra": "3860 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/check_hit - B/op",
            "value": 36635,
            "unit": "B/op",
            "extra": "3860 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/check_hit - allocs/op",
            "value": 531,
            "unit": "allocs/op",
            "extra": "3860 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/check_miss",
            "value": 295068,
            "unit": "ns/op\t   36782 B/op\t     534 allocs/op",
            "extra": "3937 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/check_miss - ns/op",
            "value": 295068,
            "unit": "ns/op",
            "extra": "3937 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/check_miss - B/op",
            "value": 36782,
            "unit": "B/op",
            "extra": "3937 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/check_miss - allocs/op",
            "value": 534,
            "unit": "allocs/op",
            "extra": "3937 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/lookup_all_teams",
            "value": 9276063,
            "unit": "ns/op\t 1944291 B/op\t    2543 allocs/op",
            "extra": "128 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/lookup_all_teams - ns/op",
            "value": 9276063,
            "unit": "ns/op",
            "extra": "128 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/lookup_all_teams - B/op",
            "value": 1944291,
            "unit": "B/op",
            "extra": "128 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/lookup_all_teams - allocs/op",
            "value": 2543,
            "unit": "allocs/op",
            "extra": "128 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/subjects_at_top",
            "value": 336490,
            "unit": "ns/op\t   82513 B/op\t    1046 allocs/op",
            "extra": "3627 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/subjects_at_top - ns/op",
            "value": 336490,
            "unit": "ns/op",
            "extra": "3627 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/subjects_at_top - B/op",
            "value": 82513,
            "unit": "B/op",
            "extra": "3627 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/subjects_at_top - allocs/op",
            "value": 1046,
            "unit": "allocs/op",
            "extra": "3627 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/toggle_top_edge",
            "value": 21165,
            "unit": "ns/op\t   34056 B/op\t      17 allocs/op",
            "extra": "57453 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/toggle_top_edge - ns/op",
            "value": 21165,
            "unit": "ns/op",
            "extra": "57453 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/toggle_top_edge - B/op",
            "value": 34056,
            "unit": "B/op",
            "extra": "57453 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/toggle_top_edge - allocs/op",
            "value": 17,
            "unit": "allocs/op",
            "extra": "57453 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/toggle_bottom_edge",
            "value": 22496,
            "unit": "ns/op\t   33984 B/op\t      17 allocs/op",
            "extra": "53608 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/toggle_bottom_edge - ns/op",
            "value": 22496,
            "unit": "ns/op",
            "extra": "53608 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/toggle_bottom_edge - B/op",
            "value": 33984,
            "unit": "B/op",
            "extra": "53608 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/toggle_bottom_edge - allocs/op",
            "value": 17,
            "unit": "allocs/op",
            "extra": "53608 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/check_hit",
            "value": 22166610,
            "unit": "ns/op\t  189599 B/op\t    3262 allocs/op",
            "extra": "51 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/check_hit - ns/op",
            "value": 22166610,
            "unit": "ns/op",
            "extra": "51 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/check_hit - B/op",
            "value": 189599,
            "unit": "B/op",
            "extra": "51 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/check_hit - allocs/op",
            "value": 3262,
            "unit": "allocs/op",
            "extra": "51 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/check_miss",
            "value": 22752866,
            "unit": "ns/op\t  189736 B/op\t    3282 allocs/op",
            "extra": "56 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/check_miss - ns/op",
            "value": 22752866,
            "unit": "ns/op",
            "extra": "56 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/check_miss - B/op",
            "value": 189736,
            "unit": "B/op",
            "extra": "56 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/check_miss - allocs/op",
            "value": 3282,
            "unit": "allocs/op",
            "extra": "56 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/lookup_all_teams",
            "value": 60427256,
            "unit": "ns/op\t 3606358 B/op\t   53503 allocs/op",
            "extra": "19 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/lookup_all_teams - ns/op",
            "value": 60427256,
            "unit": "ns/op",
            "extra": "19 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/lookup_all_teams - B/op",
            "value": 3606358,
            "unit": "B/op",
            "extra": "19 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/lookup_all_teams - allocs/op",
            "value": 53503,
            "unit": "allocs/op",
            "extra": "19 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/subjects_at_top",
            "value": 22877357,
            "unit": "ns/op\t  233905 B/op\t    3794 allocs/op",
            "extra": "52 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/subjects_at_top - ns/op",
            "value": 22877357,
            "unit": "ns/op",
            "extra": "52 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/subjects_at_top - B/op",
            "value": 233905,
            "unit": "B/op",
            "extra": "52 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/subjects_at_top - allocs/op",
            "value": 3794,
            "unit": "allocs/op",
            "extra": "52 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/toggle_top_edge",
            "value": 1996123,
            "unit": "ns/op\t    8012 B/op\t     149 allocs/op",
            "extra": "603 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/toggle_top_edge - ns/op",
            "value": 1996123,
            "unit": "ns/op",
            "extra": "603 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/toggle_top_edge - B/op",
            "value": 8012,
            "unit": "B/op",
            "extra": "603 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/toggle_top_edge - allocs/op",
            "value": 149,
            "unit": "allocs/op",
            "extra": "603 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/toggle_bottom_edge",
            "value": 2013033,
            "unit": "ns/op\t    8118 B/op\t     149 allocs/op",
            "extra": "596 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/toggle_bottom_edge - ns/op",
            "value": 2013033,
            "unit": "ns/op",
            "extra": "596 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/toggle_bottom_edge - B/op",
            "value": 8118,
            "unit": "B/op",
            "extra": "596 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/toggle_bottom_edge - allocs/op",
            "value": 149,
            "unit": "allocs/op",
            "extra": "596 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/check_hit",
            "value": 981181,
            "unit": "ns/op\t    4117 B/op\t      53 allocs/op",
            "extra": "1236 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/check_hit - ns/op",
            "value": 981181,
            "unit": "ns/op",
            "extra": "1236 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/check_hit - B/op",
            "value": 4117,
            "unit": "B/op",
            "extra": "1236 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/check_hit - allocs/op",
            "value": 53,
            "unit": "allocs/op",
            "extra": "1236 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/check_miss",
            "value": 1320103,
            "unit": "ns/op\t    6465 B/op\t      74 allocs/op",
            "extra": "921 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/check_miss - ns/op",
            "value": 1320103,
            "unit": "ns/op",
            "extra": "921 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/check_miss - B/op",
            "value": 6465,
            "unit": "B/op",
            "extra": "921 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/check_miss - allocs/op",
            "value": 74,
            "unit": "allocs/op",
            "extra": "921 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/lookup_all_teams",
            "value": 14918335,
            "unit": "ns/op\t   18587 B/op\t     347 allocs/op",
            "extra": "74 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/lookup_all_teams - ns/op",
            "value": 14918335,
            "unit": "ns/op",
            "extra": "74 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/lookup_all_teams - B/op",
            "value": 18587,
            "unit": "B/op",
            "extra": "74 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/lookup_all_teams - allocs/op",
            "value": 347,
            "unit": "allocs/op",
            "extra": "74 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/subjects_at_top",
            "value": 1346291,
            "unit": "ns/op\t    5285 B/op\t      72 allocs/op",
            "extra": "900 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/subjects_at_top - ns/op",
            "value": 1346291,
            "unit": "ns/op",
            "extra": "900 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/subjects_at_top - B/op",
            "value": 5285,
            "unit": "B/op",
            "extra": "900 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/subjects_at_top - allocs/op",
            "value": 72,
            "unit": "allocs/op",
            "extra": "900 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/toggle_top_edge",
            "value": 57757204,
            "unit": "ns/op\t  194874 B/op\t    2272 allocs/op",
            "extra": "19 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/toggle_top_edge - ns/op",
            "value": 57757204,
            "unit": "ns/op",
            "extra": "19 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/toggle_top_edge - B/op",
            "value": 194874,
            "unit": "B/op",
            "extra": "19 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/toggle_top_edge - allocs/op",
            "value": 2272,
            "unit": "allocs/op",
            "extra": "19 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/toggle_bottom_edge",
            "value": 6644236,
            "unit": "ns/op\t   72139 B/op\t    1102 allocs/op",
            "extra": "168 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/toggle_bottom_edge - ns/op",
            "value": 6644236,
            "unit": "ns/op",
            "extra": "168 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/toggle_bottom_edge - B/op",
            "value": 72139,
            "unit": "B/op",
            "extra": "168 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/toggle_bottom_edge - allocs/op",
            "value": 1102,
            "unit": "allocs/op",
            "extra": "168 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/check_hit",
            "value": 535327,
            "unit": "ns/op\t    1380 B/op\t      30 allocs/op",
            "extra": "2258 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/check_hit - ns/op",
            "value": 535327,
            "unit": "ns/op",
            "extra": "2258 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/check_hit - B/op",
            "value": 1380,
            "unit": "B/op",
            "extra": "2258 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/check_hit - allocs/op",
            "value": 30,
            "unit": "allocs/op",
            "extra": "2258 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/check_miss",
            "value": 444469,
            "unit": "ns/op\t    1338 B/op\t      30 allocs/op",
            "extra": "2684 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/check_miss - ns/op",
            "value": 444469,
            "unit": "ns/op",
            "extra": "2684 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/check_miss - B/op",
            "value": 1338,
            "unit": "B/op",
            "extra": "2684 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/check_miss - allocs/op",
            "value": 30,
            "unit": "allocs/op",
            "extra": "2684 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/lookup_all_teams",
            "value": 14941279,
            "unit": "ns/op\t   19571 B/op\t     347 allocs/op",
            "extra": "75 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/lookup_all_teams - ns/op",
            "value": 14941279,
            "unit": "ns/op",
            "extra": "75 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/lookup_all_teams - B/op",
            "value": 19571,
            "unit": "B/op",
            "extra": "75 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/lookup_all_teams - allocs/op",
            "value": 347,
            "unit": "allocs/op",
            "extra": "75 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/subjects_at_top",
            "value": 1229068,
            "unit": "ns/op\t    2082 B/op\t      38 allocs/op",
            "extra": "976 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/subjects_at_top - ns/op",
            "value": 1229068,
            "unit": "ns/op",
            "extra": "976 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/subjects_at_top - B/op",
            "value": 2082,
            "unit": "B/op",
            "extra": "976 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/subjects_at_top - allocs/op",
            "value": 38,
            "unit": "allocs/op",
            "extra": "976 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/toggle_top_edge",
            "value": 59983939,
            "unit": "ns/op\t  196271 B/op\t    2388 allocs/op",
            "extra": "19 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/toggle_top_edge - ns/op",
            "value": 59983939,
            "unit": "ns/op",
            "extra": "19 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/toggle_top_edge - B/op",
            "value": 196271,
            "unit": "B/op",
            "extra": "19 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/toggle_top_edge - allocs/op",
            "value": 2388,
            "unit": "allocs/op",
            "extra": "19 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/toggle_bottom_edge",
            "value": 7275208,
            "unit": "ns/op\t   75216 B/op\t    1156 allocs/op",
            "extra": "160 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/toggle_bottom_edge - ns/op",
            "value": 7275208,
            "unit": "ns/op",
            "extra": "160 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/toggle_bottom_edge - B/op",
            "value": 75216,
            "unit": "B/op",
            "extra": "160 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/toggle_bottom_edge - allocs/op",
            "value": 1156,
            "unit": "allocs/op",
            "extra": "160 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/memory/lookup_hub",
            "value": 1362970,
            "unit": "ns/op\t   87287 B/op\t     148 allocs/op",
            "extra": "859 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/memory/lookup_hub - ns/op",
            "value": 1362970,
            "unit": "ns/op",
            "extra": "859 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/memory/lookup_hub - B/op",
            "value": 87287,
            "unit": "B/op",
            "extra": "859 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/memory/lookup_hub - allocs/op",
            "value": 148,
            "unit": "allocs/op",
            "extra": "859 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/memory/lookup_single_owner",
            "value": 699363,
            "unit": "ns/op\t    2707 B/op\t      50 allocs/op",
            "extra": "1729 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/memory/lookup_single_owner - ns/op",
            "value": 699363,
            "unit": "ns/op",
            "extra": "1729 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/memory/lookup_single_owner - B/op",
            "value": 2707,
            "unit": "B/op",
            "extra": "1729 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/memory/lookup_single_owner - allocs/op",
            "value": 50,
            "unit": "allocs/op",
            "extra": "1729 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/memory/check_miss",
            "value": 223370,
            "unit": "ns/op\t    1133 B/op\t      16 allocs/op",
            "extra": "5419 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/memory/check_miss - ns/op",
            "value": 223370,
            "unit": "ns/op",
            "extra": "5419 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/memory/check_miss - B/op",
            "value": 1133,
            "unit": "B/op",
            "extra": "5419 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/memory/check_miss - allocs/op",
            "value": 16,
            "unit": "allocs/op",
            "extra": "5419 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres/lookup_hub",
            "value": 5999807,
            "unit": "ns/op\t  147987 B/op\t    1779 allocs/op",
            "extra": "196 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres/lookup_hub - ns/op",
            "value": 5999807,
            "unit": "ns/op",
            "extra": "196 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres/lookup_hub - B/op",
            "value": 147987,
            "unit": "B/op",
            "extra": "196 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres/lookup_hub - allocs/op",
            "value": 1779,
            "unit": "allocs/op",
            "extra": "196 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres/lookup_single_owner",
            "value": 4600322,
            "unit": "ns/op\t   12743 B/op\t     209 allocs/op",
            "extra": "259 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres/lookup_single_owner - ns/op",
            "value": 4600322,
            "unit": "ns/op",
            "extra": "259 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres/lookup_single_owner - B/op",
            "value": 12743,
            "unit": "B/op",
            "extra": "259 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres/lookup_single_owner - allocs/op",
            "value": 209,
            "unit": "allocs/op",
            "extra": "259 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres/check_miss",
            "value": 701614,
            "unit": "ns/op\t    3915 B/op\t      65 allocs/op",
            "extra": "1698 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres/check_miss - ns/op",
            "value": 701614,
            "unit": "ns/op",
            "extra": "1698 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres/check_miss - B/op",
            "value": 3915,
            "unit": "B/op",
            "extra": "1698 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres/check_miss - allocs/op",
            "value": 65,
            "unit": "allocs/op",
            "extra": "1698 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+closure/lookup_hub",
            "value": 1107293,
            "unit": "ns/op\t   14152 B/op\t     221 allocs/op",
            "extra": "1039 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+closure/lookup_hub - ns/op",
            "value": 1107293,
            "unit": "ns/op",
            "extra": "1039 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+closure/lookup_hub - B/op",
            "value": 14152,
            "unit": "B/op",
            "extra": "1039 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+closure/lookup_hub - allocs/op",
            "value": 221,
            "unit": "allocs/op",
            "extra": "1039 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+closure/lookup_single_owner",
            "value": 1019907,
            "unit": "ns/op\t    2776 B/op\t      54 allocs/op",
            "extra": "1180 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+closure/lookup_single_owner - ns/op",
            "value": 1019907,
            "unit": "ns/op",
            "extra": "1180 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+closure/lookup_single_owner - B/op",
            "value": 2776,
            "unit": "B/op",
            "extra": "1180 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+closure/lookup_single_owner - allocs/op",
            "value": 54,
            "unit": "allocs/op",
            "extra": "1180 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+closure/check_miss",
            "value": 1144344,
            "unit": "ns/op\t    6371 B/op\t      74 allocs/op",
            "extra": "945 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+closure/check_miss - ns/op",
            "value": 1144344,
            "unit": "ns/op",
            "extra": "945 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+closure/check_miss - B/op",
            "value": 6371,
            "unit": "B/op",
            "extra": "945 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+closure/check_miss - allocs/op",
            "value": 74,
            "unit": "allocs/op",
            "extra": "945 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+sets/lookup_hub",
            "value": 588352,
            "unit": "ns/op\t    9921 B/op\t     194 allocs/op",
            "extra": "2031 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+sets/lookup_hub - ns/op",
            "value": 588352,
            "unit": "ns/op",
            "extra": "2031 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+sets/lookup_hub - B/op",
            "value": 9921,
            "unit": "B/op",
            "extra": "2031 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+sets/lookup_hub - allocs/op",
            "value": 194,
            "unit": "allocs/op",
            "extra": "2031 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+sets/lookup_single_owner",
            "value": 449612,
            "unit": "ns/op\t    1689 B/op\t      34 allocs/op",
            "extra": "2666 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+sets/lookup_single_owner - ns/op",
            "value": 449612,
            "unit": "ns/op",
            "extra": "2666 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+sets/lookup_single_owner - B/op",
            "value": 1689,
            "unit": "B/op",
            "extra": "2666 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+sets/lookup_single_owner - allocs/op",
            "value": 34,
            "unit": "allocs/op",
            "extra": "2666 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+sets/check_miss",
            "value": 532844,
            "unit": "ns/op\t    1330 B/op\t      30 allocs/op",
            "extra": "2311 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+sets/check_miss - ns/op",
            "value": 532844,
            "unit": "ns/op",
            "extra": "2311 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+sets/check_miss - B/op",
            "value": 1330,
            "unit": "B/op",
            "extra": "2311 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+sets/check_miss - allocs/op",
            "value": 30,
            "unit": "allocs/op",
            "extra": "2311 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/memory/lookup_needle",
            "value": 3002276,
            "unit": "ns/op\t    2950 B/op\t      50 allocs/op",
            "extra": "392 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/memory/lookup_needle - ns/op",
            "value": 3002276,
            "unit": "ns/op",
            "extra": "392 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/memory/lookup_needle - B/op",
            "value": 2950,
            "unit": "B/op",
            "extra": "392 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/memory/lookup_needle - allocs/op",
            "value": 50,
            "unit": "allocs/op",
            "extra": "392 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/memory/check_needle",
            "value": 1076097,
            "unit": "ns/op\t    1178 B/op\t      16 allocs/op",
            "extra": "1125 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/memory/check_needle - ns/op",
            "value": 1076097,
            "unit": "ns/op",
            "extra": "1125 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/memory/check_needle - B/op",
            "value": 1178,
            "unit": "B/op",
            "extra": "1125 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/memory/check_needle - allocs/op",
            "value": 16,
            "unit": "allocs/op",
            "extra": "1125 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/memory/lookup_nobody",
            "value": 1506021,
            "unit": "ns/op\t    1220 B/op\t      24 allocs/op",
            "extra": "800 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/memory/lookup_nobody - ns/op",
            "value": 1506021,
            "unit": "ns/op",
            "extra": "800 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/memory/lookup_nobody - B/op",
            "value": 1220,
            "unit": "B/op",
            "extra": "800 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/memory/lookup_nobody - allocs/op",
            "value": 24,
            "unit": "allocs/op",
            "extra": "800 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres/lookup_needle",
            "value": 1624266,
            "unit": "ns/op\t   13117 B/op\t     209 allocs/op",
            "extra": "734 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres/lookup_needle - ns/op",
            "value": 1624266,
            "unit": "ns/op",
            "extra": "734 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres/lookup_needle - B/op",
            "value": 13117,
            "unit": "B/op",
            "extra": "734 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres/lookup_needle - allocs/op",
            "value": 209,
            "unit": "allocs/op",
            "extra": "734 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres/check_needle",
            "value": 702318,
            "unit": "ns/op\t    3955 B/op\t      65 allocs/op",
            "extra": "1713 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres/check_needle - ns/op",
            "value": 702318,
            "unit": "ns/op",
            "extra": "1713 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres/check_needle - B/op",
            "value": 3955,
            "unit": "B/op",
            "extra": "1713 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres/check_needle - allocs/op",
            "value": 65,
            "unit": "allocs/op",
            "extra": "1713 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres/lookup_nobody",
            "value": 942246,
            "unit": "ns/op\t    5889 B/op\t      98 allocs/op",
            "extra": "1262 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres/lookup_nobody - ns/op",
            "value": 942246,
            "unit": "ns/op",
            "extra": "1262 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres/lookup_nobody - B/op",
            "value": 5889,
            "unit": "B/op",
            "extra": "1262 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres/lookup_nobody - allocs/op",
            "value": 98,
            "unit": "allocs/op",
            "extra": "1262 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+closure/lookup_needle",
            "value": 1030384,
            "unit": "ns/op\t    2747 B/op\t      54 allocs/op",
            "extra": "1150 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+closure/lookup_needle - ns/op",
            "value": 1030384,
            "unit": "ns/op",
            "extra": "1150 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+closure/lookup_needle - B/op",
            "value": 2747,
            "unit": "B/op",
            "extra": "1150 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+closure/lookup_needle - allocs/op",
            "value": 54,
            "unit": "allocs/op",
            "extra": "1150 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+closure/check_needle",
            "value": 1125336,
            "unit": "ns/op\t    6933 B/op\t      84 allocs/op",
            "extra": "1084 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+closure/check_needle - ns/op",
            "value": 1125336,
            "unit": "ns/op",
            "extra": "1084 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+closure/check_needle - B/op",
            "value": 6933,
            "unit": "B/op",
            "extra": "1084 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+closure/check_needle - allocs/op",
            "value": 84,
            "unit": "allocs/op",
            "extra": "1084 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+closure/lookup_nobody",
            "value": 1011435,
            "unit": "ns/op\t    2162 B/op\t      45 allocs/op",
            "extra": "1165 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+closure/lookup_nobody - ns/op",
            "value": 1011435,
            "unit": "ns/op",
            "extra": "1165 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+closure/lookup_nobody - B/op",
            "value": 2162,
            "unit": "B/op",
            "extra": "1165 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+closure/lookup_nobody - allocs/op",
            "value": 45,
            "unit": "allocs/op",
            "extra": "1165 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+sets/lookup_needle",
            "value": 447854,
            "unit": "ns/op\t    1718 B/op\t      34 allocs/op",
            "extra": "2685 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+sets/lookup_needle - ns/op",
            "value": 447854,
            "unit": "ns/op",
            "extra": "2685 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+sets/lookup_needle - B/op",
            "value": 1718,
            "unit": "B/op",
            "extra": "2685 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+sets/lookup_needle - allocs/op",
            "value": 34,
            "unit": "allocs/op",
            "extra": "2685 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+sets/check_needle",
            "value": 461500,
            "unit": "ns/op\t    1366 B/op\t      30 allocs/op",
            "extra": "2594 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+sets/check_needle - ns/op",
            "value": 461500,
            "unit": "ns/op",
            "extra": "2594 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+sets/check_needle - B/op",
            "value": 1366,
            "unit": "B/op",
            "extra": "2594 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+sets/check_needle - allocs/op",
            "value": 30,
            "unit": "allocs/op",
            "extra": "2594 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+sets/lookup_nobody",
            "value": 433652,
            "unit": "ns/op\t    1417 B/op\t      26 allocs/op",
            "extra": "2876 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+sets/lookup_nobody - ns/op",
            "value": 433652,
            "unit": "ns/op",
            "extra": "2876 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+sets/lookup_nobody - B/op",
            "value": 1417,
            "unit": "B/op",
            "extra": "2876 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+sets/lookup_nobody - allocs/op",
            "value": 26,
            "unit": "allocs/op",
            "extra": "2876 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/memory/check_last",
            "value": 10500110,
            "unit": "ns/op\t  648647 B/op\t    9818 allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/memory/check_last - ns/op",
            "value": 10500110,
            "unit": "ns/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/memory/check_last - B/op",
            "value": 648647,
            "unit": "B/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/memory/check_last - allocs/op",
            "value": 9818,
            "unit": "allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/memory/check_miss",
            "value": 11703286,
            "unit": "ns/op\t  734688 B/op\t   10076 allocs/op",
            "extra": "98 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/memory/check_miss - ns/op",
            "value": 11703286,
            "unit": "ns/op",
            "extra": "98 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/memory/check_miss - B/op",
            "value": 734688,
            "unit": "B/op",
            "extra": "98 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/memory/check_miss - allocs/op",
            "value": 10076,
            "unit": "allocs/op",
            "extra": "98 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/memory/subjects_teams",
            "value": 24130494,
            "unit": "ns/op\t11990864 B/op\t   18878 allocs/op",
            "extra": "44 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/memory/subjects_teams - ns/op",
            "value": 24130494,
            "unit": "ns/op",
            "extra": "44 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/memory/subjects_teams - B/op",
            "value": 11990864,
            "unit": "B/op",
            "extra": "44 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/memory/subjects_teams - allocs/op",
            "value": 18878,
            "unit": "allocs/op",
            "extra": "44 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/memory/subjects_users",
            "value": 24554682,
            "unit": "ns/op\t11990553 B/op\t   18874 allocs/op",
            "extra": "46 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/memory/subjects_users - ns/op",
            "value": 24554682,
            "unit": "ns/op",
            "extra": "46 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/memory/subjects_users - B/op",
            "value": 11990553,
            "unit": "B/op",
            "extra": "46 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/memory/subjects_users - allocs/op",
            "value": 18874,
            "unit": "allocs/op",
            "extra": "46 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/memory/lookup_one",
            "value": 522349,
            "unit": "ns/op\t    7194 B/op\t     130 allocs/op",
            "extra": "2302 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/memory/lookup_one - ns/op",
            "value": 522349,
            "unit": "ns/op",
            "extra": "2302 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/memory/lookup_one - B/op",
            "value": 7194,
            "unit": "B/op",
            "extra": "2302 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/memory/lookup_one - allocs/op",
            "value": 130,
            "unit": "allocs/op",
            "extra": "2302 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres/check_last",
            "value": 148978392,
            "unit": "ns/op\t 1066138 B/op\t   17372 allocs/op",
            "extra": "7 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres/check_last - ns/op",
            "value": 148978392,
            "unit": "ns/op",
            "extra": "7 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres/check_last - B/op",
            "value": 1066138,
            "unit": "B/op",
            "extra": "7 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres/check_last - allocs/op",
            "value": 17372,
            "unit": "allocs/op",
            "extra": "7 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres/check_miss",
            "value": 167679487,
            "unit": "ns/op\t 1228726 B/op\t   19101 allocs/op",
            "extra": "7 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres/check_miss - ns/op",
            "value": 167679487,
            "unit": "ns/op",
            "extra": "7 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres/check_miss - B/op",
            "value": 1228726,
            "unit": "B/op",
            "extra": "7 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres/check_miss - allocs/op",
            "value": 19101,
            "unit": "allocs/op",
            "extra": "7 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres/subjects_teams",
            "value": 187178109,
            "unit": "ns/op\t12470076 B/op\t   27826 allocs/op",
            "extra": "6 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres/subjects_teams - ns/op",
            "value": 187178109,
            "unit": "ns/op",
            "extra": "6 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres/subjects_teams - B/op",
            "value": 12470076,
            "unit": "B/op",
            "extra": "6 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres/subjects_teams - allocs/op",
            "value": 27826,
            "unit": "allocs/op",
            "extra": "6 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres/subjects_users",
            "value": 186253243,
            "unit": "ns/op\t12471626 B/op\t   27854 allocs/op",
            "extra": "6 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres/subjects_users - ns/op",
            "value": 186253243,
            "unit": "ns/op",
            "extra": "6 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres/subjects_users - B/op",
            "value": 12471626,
            "unit": "B/op",
            "extra": "6 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres/subjects_users - allocs/op",
            "value": 27854,
            "unit": "allocs/op",
            "extra": "6 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres/lookup_one",
            "value": 7259066,
            "unit": "ns/op\t   46161 B/op\t     745 allocs/op",
            "extra": "162 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres/lookup_one - ns/op",
            "value": 7259066,
            "unit": "ns/op",
            "extra": "162 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres/lookup_one - B/op",
            "value": 46161,
            "unit": "B/op",
            "extra": "162 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres/lookup_one - allocs/op",
            "value": 745,
            "unit": "allocs/op",
            "extra": "162 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+closure/check_last",
            "value": 2030180,
            "unit": "ns/op\t    3994 B/op\t      53 allocs/op",
            "extra": "590 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+closure/check_last - ns/op",
            "value": 2030180,
            "unit": "ns/op",
            "extra": "590 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+closure/check_last - B/op",
            "value": 3994,
            "unit": "B/op",
            "extra": "590 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+closure/check_last - allocs/op",
            "value": 53,
            "unit": "allocs/op",
            "extra": "590 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+closure/check_miss",
            "value": 2424102,
            "unit": "ns/op\t    6301 B/op\t      74 allocs/op",
            "extra": "493 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+closure/check_miss - ns/op",
            "value": 2424102,
            "unit": "ns/op",
            "extra": "493 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+closure/check_miss - B/op",
            "value": 6301,
            "unit": "B/op",
            "extra": "493 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+closure/check_miss - allocs/op",
            "value": 74,
            "unit": "allocs/op",
            "extra": "493 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+closure/subjects_teams",
            "value": 47269991,
            "unit": "ns/op\t  312325 B/op\t    3566 allocs/op",
            "extra": "25 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+closure/subjects_teams - ns/op",
            "value": 47269991,
            "unit": "ns/op",
            "extra": "25 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+closure/subjects_teams - B/op",
            "value": 312325,
            "unit": "B/op",
            "extra": "25 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+closure/subjects_teams - allocs/op",
            "value": 3566,
            "unit": "allocs/op",
            "extra": "25 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+closure/subjects_users",
            "value": 3096009,
            "unit": "ns/op\t  363578 B/op\t    3605 allocs/op",
            "extra": "384 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+closure/subjects_users - ns/op",
            "value": 3096009,
            "unit": "ns/op",
            "extra": "384 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+closure/subjects_users - B/op",
            "value": 363578,
            "unit": "B/op",
            "extra": "384 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+closure/subjects_users - allocs/op",
            "value": 3605,
            "unit": "allocs/op",
            "extra": "384 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+closure/lookup_one",
            "value": 2414201,
            "unit": "ns/op\t    2676 B/op\t      53 allocs/op",
            "extra": "507 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+closure/lookup_one - ns/op",
            "value": 2414201,
            "unit": "ns/op",
            "extra": "507 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+closure/lookup_one - B/op",
            "value": 2676,
            "unit": "B/op",
            "extra": "507 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+closure/lookup_one - allocs/op",
            "value": 53,
            "unit": "allocs/op",
            "extra": "507 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+sets/check_last",
            "value": 472833,
            "unit": "ns/op\t    1345 B/op\t      30 allocs/op",
            "extra": "2580 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+sets/check_last - ns/op",
            "value": 472833,
            "unit": "ns/op",
            "extra": "2580 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+sets/check_last - B/op",
            "value": 1345,
            "unit": "B/op",
            "extra": "2580 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+sets/check_last - allocs/op",
            "value": 30,
            "unit": "allocs/op",
            "extra": "2580 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+sets/check_miss",
            "value": 459386,
            "unit": "ns/op\t    1338 B/op\t      30 allocs/op",
            "extra": "2787 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+sets/check_miss - ns/op",
            "value": 459386,
            "unit": "ns/op",
            "extra": "2787 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+sets/check_miss - B/op",
            "value": 1338,
            "unit": "B/op",
            "extra": "2787 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+sets/check_miss - allocs/op",
            "value": 30,
            "unit": "allocs/op",
            "extra": "2787 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+sets/subjects_teams",
            "value": 46998144,
            "unit": "ns/op\t  312316 B/op\t    3566 allocs/op",
            "extra": "25 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+sets/subjects_teams - ns/op",
            "value": 46998144,
            "unit": "ns/op",
            "extra": "25 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+sets/subjects_teams - B/op",
            "value": 312316,
            "unit": "B/op",
            "extra": "25 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+sets/subjects_teams - allocs/op",
            "value": 3566,
            "unit": "allocs/op",
            "extra": "25 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+sets/subjects_users",
            "value": 1799359,
            "unit": "ns/op\t  102416 B/op\t    1559 allocs/op",
            "extra": "644 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+sets/subjects_users - ns/op",
            "value": 1799359,
            "unit": "ns/op",
            "extra": "644 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+sets/subjects_users - B/op",
            "value": 102416,
            "unit": "B/op",
            "extra": "644 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+sets/subjects_users - allocs/op",
            "value": 1559,
            "unit": "allocs/op",
            "extra": "644 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+sets/lookup_one",
            "value": 454854,
            "unit": "ns/op\t    1736 B/op\t      33 allocs/op",
            "extra": "2732 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+sets/lookup_one - ns/op",
            "value": 454854,
            "unit": "ns/op",
            "extra": "2732 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+sets/lookup_one - B/op",
            "value": 1736,
            "unit": "B/op",
            "extra": "2732 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+sets/lookup_one - allocs/op",
            "value": 33,
            "unit": "allocs/op",
            "extra": "2732 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/memory/check_top",
            "value": 215268,
            "unit": "ns/op\t   47499 B/op\t     529 allocs/op",
            "extra": "5090 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/memory/check_top - ns/op",
            "value": 215268,
            "unit": "ns/op",
            "extra": "5090 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/memory/check_top - B/op",
            "value": 47499,
            "unit": "B/op",
            "extra": "5090 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/memory/check_top - allocs/op",
            "value": 529,
            "unit": "allocs/op",
            "extra": "5090 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/memory/lookup_all_layers",
            "value": 6314284,
            "unit": "ns/op\t 2586286 B/op\t   40577 allocs/op",
            "extra": "192 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/memory/lookup_all_layers - ns/op",
            "value": 6314284,
            "unit": "ns/op",
            "extra": "192 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/memory/lookup_all_layers - B/op",
            "value": 2586286,
            "unit": "B/op",
            "extra": "192 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/memory/lookup_all_layers - allocs/op",
            "value": 40577,
            "unit": "allocs/op",
            "extra": "192 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/memory/toggle_bottom_edge",
            "value": 239040,
            "unit": "ns/op\t  495581 B/op\t      22 allocs/op",
            "extra": "4614 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/memory/toggle_bottom_edge - ns/op",
            "value": 239040,
            "unit": "ns/op",
            "extra": "4614 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/memory/toggle_bottom_edge - B/op",
            "value": 495581,
            "unit": "B/op",
            "extra": "4614 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/memory/toggle_bottom_edge - allocs/op",
            "value": 22,
            "unit": "allocs/op",
            "extra": "4614 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres/check_top",
            "value": 2568140,
            "unit": "ns/op\t   44992 B/op\t     642 allocs/op",
            "extra": "463 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres/check_top - ns/op",
            "value": 2568140,
            "unit": "ns/op",
            "extra": "463 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres/check_top - B/op",
            "value": 44992,
            "unit": "B/op",
            "extra": "463 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres/check_top - allocs/op",
            "value": 642,
            "unit": "allocs/op",
            "extra": "463 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres/lookup_all_layers",
            "value": 5809805,
            "unit": "ns/op\t 1131600 B/op\t   17151 allocs/op",
            "extra": "192 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres/lookup_all_layers - ns/op",
            "value": 5809805,
            "unit": "ns/op",
            "extra": "192 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres/lookup_all_layers - B/op",
            "value": 1131600,
            "unit": "B/op",
            "extra": "192 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres/lookup_all_layers - allocs/op",
            "value": 17151,
            "unit": "allocs/op",
            "extra": "192 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres/toggle_bottom_edge",
            "value": 2030757,
            "unit": "ns/op\t    8230 B/op\t     149 allocs/op",
            "extra": "582 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres/toggle_bottom_edge - ns/op",
            "value": 2030757,
            "unit": "ns/op",
            "extra": "582 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres/toggle_bottom_edge - B/op",
            "value": 8230,
            "unit": "B/op",
            "extra": "582 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres/toggle_bottom_edge - allocs/op",
            "value": 149,
            "unit": "allocs/op",
            "extra": "582 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+closure/check_top",
            "value": 774746,
            "unit": "ns/op\t    4068 B/op\t      53 allocs/op",
            "extra": "1536 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+closure/check_top - ns/op",
            "value": 774746,
            "unit": "ns/op",
            "extra": "1536 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+closure/check_top - B/op",
            "value": 4068,
            "unit": "B/op",
            "extra": "1536 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+closure/check_top - allocs/op",
            "value": 53,
            "unit": "allocs/op",
            "extra": "1536 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+closure/lookup_all_layers",
            "value": 1287754,
            "unit": "ns/op\t   13863 B/op\t     229 allocs/op",
            "extra": "926 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+closure/lookup_all_layers - ns/op",
            "value": 1287754,
            "unit": "ns/op",
            "extra": "926 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+closure/lookup_all_layers - B/op",
            "value": 13863,
            "unit": "B/op",
            "extra": "926 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+closure/lookup_all_layers - allocs/op",
            "value": 229,
            "unit": "allocs/op",
            "extra": "926 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+closure/toggle_bottom_edge",
            "value": 8760687,
            "unit": "ns/op\t   40618 B/op\t     631 allocs/op",
            "extra": "139 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+closure/toggle_bottom_edge - ns/op",
            "value": 8760687,
            "unit": "ns/op",
            "extra": "139 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+closure/toggle_bottom_edge - B/op",
            "value": 40618,
            "unit": "B/op",
            "extra": "139 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+closure/toggle_bottom_edge - allocs/op",
            "value": 631,
            "unit": "allocs/op",
            "extra": "139 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+sets/check_top",
            "value": 795942,
            "unit": "ns/op\t    1330 B/op\t      30 allocs/op",
            "extra": "1515 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+sets/check_top - ns/op",
            "value": 795942,
            "unit": "ns/op",
            "extra": "1515 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+sets/check_top - B/op",
            "value": 1330,
            "unit": "B/op",
            "extra": "1515 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+sets/check_top - allocs/op",
            "value": 30,
            "unit": "allocs/op",
            "extra": "1515 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+sets/lookup_all_layers",
            "value": 1283899,
            "unit": "ns/op\t   13862 B/op\t     229 allocs/op",
            "extra": "920 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+sets/lookup_all_layers - ns/op",
            "value": 1283899,
            "unit": "ns/op",
            "extra": "920 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+sets/lookup_all_layers - B/op",
            "value": 13862,
            "unit": "B/op",
            "extra": "920 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+sets/lookup_all_layers - allocs/op",
            "value": 229,
            "unit": "allocs/op",
            "extra": "920 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+sets/toggle_bottom_edge",
            "value": 9479704,
            "unit": "ns/op\t   45729 B/op\t     951 allocs/op",
            "extra": "128 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+sets/toggle_bottom_edge - ns/op",
            "value": 9479704,
            "unit": "ns/op",
            "extra": "128 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+sets/toggle_bottom_edge - B/op",
            "value": 45729,
            "unit": "B/op",
            "extra": "128 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+sets/toggle_bottom_edge - allocs/op",
            "value": 951,
            "unit": "allocs/op",
            "extra": "128 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/memory/check_leaf",
            "value": 86169,
            "unit": "ns/op\t   25713 B/op\t     263 allocs/op",
            "extra": "13904 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/memory/check_leaf - ns/op",
            "value": 86169,
            "unit": "ns/op",
            "extra": "13904 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/memory/check_leaf - B/op",
            "value": 25713,
            "unit": "B/op",
            "extra": "13904 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/memory/check_leaf - allocs/op",
            "value": 263,
            "unit": "allocs/op",
            "extra": "13904 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/memory/check_miss",
            "value": 87521,
            "unit": "ns/op\t   25853 B/op\t     265 allocs/op",
            "extra": "13701 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/memory/check_miss - ns/op",
            "value": 87521,
            "unit": "ns/op",
            "extra": "13701 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/memory/check_miss - B/op",
            "value": 25853,
            "unit": "B/op",
            "extra": "13701 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/memory/check_miss - allocs/op",
            "value": 265,
            "unit": "allocs/op",
            "extra": "13701 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/memory/lookup_all_folders",
            "value": 624726,
            "unit": "ns/op\t  235980 B/op\t     885 allocs/op",
            "extra": "1892 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/memory/lookup_all_folders - ns/op",
            "value": 624726,
            "unit": "ns/op",
            "extra": "1892 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/memory/lookup_all_folders - B/op",
            "value": 235980,
            "unit": "B/op",
            "extra": "1892 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/memory/lookup_all_folders - allocs/op",
            "value": 885,
            "unit": "allocs/op",
            "extra": "1892 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/memory/subjects_leaf",
            "value": 111893,
            "unit": "ns/op\t   55431 B/op\t     567 allocs/op",
            "extra": "9450 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/memory/subjects_leaf - ns/op",
            "value": 111893,
            "unit": "ns/op",
            "extra": "9450 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/memory/subjects_leaf - B/op",
            "value": 55431,
            "unit": "B/op",
            "extra": "9450 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/memory/subjects_leaf - allocs/op",
            "value": 567,
            "unit": "allocs/op",
            "extra": "9450 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres/check_leaf",
            "value": 12963579,
            "unit": "ns/op\t  102758 B/op\t    1570 allocs/op",
            "extra": "88 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres/check_leaf - ns/op",
            "value": 12963579,
            "unit": "ns/op",
            "extra": "88 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres/check_leaf - B/op",
            "value": 102758,
            "unit": "B/op",
            "extra": "88 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres/check_leaf - allocs/op",
            "value": 1570,
            "unit": "allocs/op",
            "extra": "88 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres/check_miss",
            "value": 13108777,
            "unit": "ns/op\t  104261 B/op\t    1590 allocs/op",
            "extra": "93 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres/check_miss - ns/op",
            "value": 13108777,
            "unit": "ns/op",
            "extra": "93 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres/check_miss - B/op",
            "value": 104261,
            "unit": "B/op",
            "extra": "93 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres/check_miss - allocs/op",
            "value": 1590,
            "unit": "allocs/op",
            "extra": "93 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres/lookup_all_folders",
            "value": 15521610,
            "unit": "ns/op\t  443349 B/op\t    6107 allocs/op",
            "extra": "75 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres/lookup_all_folders - ns/op",
            "value": 15521610,
            "unit": "ns/op",
            "extra": "75 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres/lookup_all_folders - B/op",
            "value": 443349,
            "unit": "B/op",
            "extra": "75 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres/lookup_all_folders - allocs/op",
            "value": 6107,
            "unit": "allocs/op",
            "extra": "75 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres/subjects_leaf",
            "value": 13232788,
            "unit": "ns/op\t  134298 B/op\t    1892 allocs/op",
            "extra": "84 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres/subjects_leaf - ns/op",
            "value": 13232788,
            "unit": "ns/op",
            "extra": "84 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres/subjects_leaf - B/op",
            "value": 134298,
            "unit": "B/op",
            "extra": "84 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres/subjects_leaf - allocs/op",
            "value": 1892,
            "unit": "allocs/op",
            "extra": "84 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+closure/check_leaf",
            "value": 18920483,
            "unit": "ns/op\t  147501 B/op\t    1868 allocs/op",
            "extra": "61 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+closure/check_leaf - ns/op",
            "value": 18920483,
            "unit": "ns/op",
            "extra": "61 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+closure/check_leaf - B/op",
            "value": 147501,
            "unit": "B/op",
            "extra": "61 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+closure/check_leaf - allocs/op",
            "value": 1868,
            "unit": "allocs/op",
            "extra": "61 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+closure/check_miss",
            "value": 18981473,
            "unit": "ns/op\t  148153 B/op\t    1878 allocs/op",
            "extra": "60 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+closure/check_miss - ns/op",
            "value": 18981473,
            "unit": "ns/op",
            "extra": "60 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+closure/check_miss - B/op",
            "value": 148153,
            "unit": "B/op",
            "extra": "60 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+closure/check_miss - allocs/op",
            "value": 1878,
            "unit": "allocs/op",
            "extra": "60 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+closure/lookup_all_folders",
            "value": 20156050,
            "unit": "ns/op\t  397409 B/op\t    5611 allocs/op",
            "extra": "58 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+closure/lookup_all_folders - ns/op",
            "value": 20156050,
            "unit": "ns/op",
            "extra": "58 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+closure/lookup_all_folders - B/op",
            "value": 397409,
            "unit": "B/op",
            "extra": "58 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+closure/lookup_all_folders - allocs/op",
            "value": 5611,
            "unit": "allocs/op",
            "extra": "58 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+closure/subjects_leaf",
            "value": 18010221,
            "unit": "ns/op\t  139196 B/op\t    1830 allocs/op",
            "extra": "62 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+closure/subjects_leaf - ns/op",
            "value": 18010221,
            "unit": "ns/op",
            "extra": "62 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+closure/subjects_leaf - B/op",
            "value": 139196,
            "unit": "B/op",
            "extra": "62 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+closure/subjects_leaf - allocs/op",
            "value": 1830,
            "unit": "allocs/op",
            "extra": "62 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+sets/check_leaf",
            "value": 778908,
            "unit": "ns/op\t    1322 B/op\t      29 allocs/op",
            "extra": "1548 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+sets/check_leaf - ns/op",
            "value": 778908,
            "unit": "ns/op",
            "extra": "1548 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+sets/check_leaf - B/op",
            "value": 1322,
            "unit": "B/op",
            "extra": "1548 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+sets/check_leaf - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "1548 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+sets/check_miss",
            "value": 773575,
            "unit": "ns/op\t    1322 B/op\t      29 allocs/op",
            "extra": "1566 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+sets/check_miss - ns/op",
            "value": 773575,
            "unit": "ns/op",
            "extra": "1566 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+sets/check_miss - B/op",
            "value": 1322,
            "unit": "B/op",
            "extra": "1566 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+sets/check_miss - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "1566 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+sets/lookup_all_folders",
            "value": 814204,
            "unit": "ns/op\t    7465 B/op\t     132 allocs/op",
            "extra": "1474 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+sets/lookup_all_folders - ns/op",
            "value": 814204,
            "unit": "ns/op",
            "extra": "1474 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+sets/lookup_all_folders - B/op",
            "value": 7465,
            "unit": "B/op",
            "extra": "1474 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+sets/lookup_all_folders - allocs/op",
            "value": 132,
            "unit": "allocs/op",
            "extra": "1474 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+sets/subjects_leaf",
            "value": 536369,
            "unit": "ns/op\t    2063 B/op\t      37 allocs/op",
            "extra": "2007 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+sets/subjects_leaf - ns/op",
            "value": 536369,
            "unit": "ns/op",
            "extra": "2007 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+sets/subjects_leaf - B/op",
            "value": 2063,
            "unit": "B/op",
            "extra": "2007 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+sets/subjects_leaf - allocs/op",
            "value": 37,
            "unit": "allocs/op",
            "extra": "2007 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/memory/check_unbanned",
            "value": 11579537,
            "unit": "ns/op\t 1770239 B/op\t      36 allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/memory/check_unbanned - ns/op",
            "value": 11579537,
            "unit": "ns/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/memory/check_unbanned - B/op",
            "value": 1770239,
            "unit": "B/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/memory/check_unbanned - allocs/op",
            "value": 36,
            "unit": "allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/memory/check_banned",
            "value": 11521522,
            "unit": "ns/op\t 1770624 B/op\t      37 allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/memory/check_banned - ns/op",
            "value": 11521522,
            "unit": "ns/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/memory/check_banned - B/op",
            "value": 1770624,
            "unit": "B/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/memory/check_banned - allocs/op",
            "value": 37,
            "unit": "allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/memory/subjects_wildcard_minus",
            "value": 13246420,
            "unit": "ns/op\t 2731752 B/op\t     144 allocs/op",
            "extra": "90 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/memory/subjects_wildcard_minus - ns/op",
            "value": 13246420,
            "unit": "ns/op",
            "extra": "90 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/memory/subjects_wildcard_minus - B/op",
            "value": 2731752,
            "unit": "B/op",
            "extra": "90 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/memory/subjects_wildcard_minus - allocs/op",
            "value": 144,
            "unit": "allocs/op",
            "extra": "90 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/memory/lookup_banned",
            "value": 356699,
            "unit": "ns/op\t    1633 B/op\t      26 allocs/op",
            "extra": "3439 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/memory/lookup_banned - ns/op",
            "value": 356699,
            "unit": "ns/op",
            "extra": "3439 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/memory/lookup_banned - B/op",
            "value": 1633,
            "unit": "B/op",
            "extra": "3439 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/memory/lookup_banned - allocs/op",
            "value": 26,
            "unit": "allocs/op",
            "extra": "3439 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/memory/lookup_unbanned",
            "value": 354633,
            "unit": "ns/op\t    1528 B/op\t      25 allocs/op",
            "extra": "3482 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/memory/lookup_unbanned - ns/op",
            "value": 354633,
            "unit": "ns/op",
            "extra": "3482 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/memory/lookup_unbanned - B/op",
            "value": 1528,
            "unit": "B/op",
            "extra": "3482 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/memory/lookup_unbanned - allocs/op",
            "value": 25,
            "unit": "allocs/op",
            "extra": "3482 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres/check_unbanned",
            "value": 5598041,
            "unit": "ns/op\t 2858981 B/op\t   30087 allocs/op",
            "extra": "208 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres/check_unbanned - ns/op",
            "value": 5598041,
            "unit": "ns/op",
            "extra": "208 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres/check_unbanned - B/op",
            "value": 2858981,
            "unit": "B/op",
            "extra": "208 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres/check_unbanned - allocs/op",
            "value": 30087,
            "unit": "allocs/op",
            "extra": "208 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres/check_banned",
            "value": 5636485,
            "unit": "ns/op\t 2858917 B/op\t   30087 allocs/op",
            "extra": "217 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres/check_banned - ns/op",
            "value": 5636485,
            "unit": "ns/op",
            "extra": "217 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres/check_banned - B/op",
            "value": 2858917,
            "unit": "B/op",
            "extra": "217 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres/check_banned - allocs/op",
            "value": 30087,
            "unit": "allocs/op",
            "extra": "217 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres/subjects_wildcard_minus",
            "value": 7511270,
            "unit": "ns/op\t 3815112 B/op\t   30194 allocs/op",
            "extra": "159 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres/subjects_wildcard_minus - ns/op",
            "value": 7511270,
            "unit": "ns/op",
            "extra": "159 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres/subjects_wildcard_minus - B/op",
            "value": 3815112,
            "unit": "B/op",
            "extra": "159 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres/subjects_wildcard_minus - allocs/op",
            "value": 30194,
            "unit": "allocs/op",
            "extra": "159 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres/lookup_banned",
            "value": 962907,
            "unit": "ns/op\t    7238 B/op\t     113 allocs/op",
            "extra": "1231 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres/lookup_banned - ns/op",
            "value": 962907,
            "unit": "ns/op",
            "extra": "1231 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres/lookup_banned - B/op",
            "value": 7238,
            "unit": "B/op",
            "extra": "1231 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres/lookup_banned - allocs/op",
            "value": 113,
            "unit": "allocs/op",
            "extra": "1231 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres/lookup_unbanned",
            "value": 951129,
            "unit": "ns/op\t    6831 B/op\t     105 allocs/op",
            "extra": "1294 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres/lookup_unbanned - ns/op",
            "value": 951129,
            "unit": "ns/op",
            "extra": "1294 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres/lookup_unbanned - B/op",
            "value": 6831,
            "unit": "B/op",
            "extra": "1294 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres/lookup_unbanned - allocs/op",
            "value": 105,
            "unit": "allocs/op",
            "extra": "1294 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+closure/check_unbanned",
            "value": 3264243,
            "unit": "ns/op\t    6985 B/op\t      82 allocs/op",
            "extra": "369 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+closure/check_unbanned - ns/op",
            "value": 3264243,
            "unit": "ns/op",
            "extra": "369 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+closure/check_unbanned - B/op",
            "value": 6985,
            "unit": "B/op",
            "extra": "369 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+closure/check_unbanned - allocs/op",
            "value": 82,
            "unit": "allocs/op",
            "extra": "369 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+closure/check_banned",
            "value": 3273692,
            "unit": "ns/op\t    7280 B/op\t      91 allocs/op",
            "extra": "366 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+closure/check_banned - ns/op",
            "value": 3273692,
            "unit": "ns/op",
            "extra": "366 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+closure/check_banned - B/op",
            "value": 7280,
            "unit": "B/op",
            "extra": "366 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+closure/check_banned - allocs/op",
            "value": 91,
            "unit": "allocs/op",
            "extra": "366 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+closure/subjects_wildcard_minus",
            "value": 10106298,
            "unit": "ns/op\t 3815694 B/op\t   30189 allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+closure/subjects_wildcard_minus - ns/op",
            "value": 10106298,
            "unit": "ns/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+closure/subjects_wildcard_minus - B/op",
            "value": 3815694,
            "unit": "B/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+closure/subjects_wildcard_minus - allocs/op",
            "value": 30189,
            "unit": "allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+closure/lookup_banned",
            "value": 5077316,
            "unit": "ns/op\t    2893 B/op\t      57 allocs/op",
            "extra": "236 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+closure/lookup_banned - ns/op",
            "value": 5077316,
            "unit": "ns/op",
            "extra": "236 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+closure/lookup_banned - B/op",
            "value": 2893,
            "unit": "B/op",
            "extra": "236 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+closure/lookup_banned - allocs/op",
            "value": 57,
            "unit": "allocs/op",
            "extra": "236 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+closure/lookup_unbanned",
            "value": 5030398,
            "unit": "ns/op\t    2671 B/op\t      53 allocs/op",
            "extra": "238 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+closure/lookup_unbanned - ns/op",
            "value": 5030398,
            "unit": "ns/op",
            "extra": "238 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+closure/lookup_unbanned - B/op",
            "value": 2671,
            "unit": "B/op",
            "extra": "238 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+closure/lookup_unbanned - allocs/op",
            "value": 53,
            "unit": "allocs/op",
            "extra": "238 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+sets/check_unbanned",
            "value": 3284020,
            "unit": "ns/op\t    6986 B/op\t      82 allocs/op",
            "extra": "368 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+sets/check_unbanned - ns/op",
            "value": 3284020,
            "unit": "ns/op",
            "extra": "368 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+sets/check_unbanned - B/op",
            "value": 6986,
            "unit": "B/op",
            "extra": "368 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+sets/check_unbanned - allocs/op",
            "value": 82,
            "unit": "allocs/op",
            "extra": "368 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+sets/check_banned",
            "value": 3331648,
            "unit": "ns/op\t    7287 B/op\t      91 allocs/op",
            "extra": "362 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+sets/check_banned - ns/op",
            "value": 3331648,
            "unit": "ns/op",
            "extra": "362 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+sets/check_banned - B/op",
            "value": 7287,
            "unit": "B/op",
            "extra": "362 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+sets/check_banned - allocs/op",
            "value": 91,
            "unit": "allocs/op",
            "extra": "362 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+sets/subjects_wildcard_minus",
            "value": 10491042,
            "unit": "ns/op\t 3820173 B/op\t   30189 allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+sets/subjects_wildcard_minus - ns/op",
            "value": 10491042,
            "unit": "ns/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+sets/subjects_wildcard_minus - B/op",
            "value": 3820173,
            "unit": "B/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+sets/subjects_wildcard_minus - allocs/op",
            "value": 30189,
            "unit": "allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+sets/lookup_banned",
            "value": 4598135,
            "unit": "ns/op\t    2735 B/op\t      57 allocs/op",
            "extra": "237 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+sets/lookup_banned - ns/op",
            "value": 4598135,
            "unit": "ns/op",
            "extra": "237 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+sets/lookup_banned - B/op",
            "value": 2735,
            "unit": "B/op",
            "extra": "237 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+sets/lookup_banned - allocs/op",
            "value": 57,
            "unit": "allocs/op",
            "extra": "237 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+sets/lookup_unbanned",
            "value": 996582,
            "unit": "ns/op\t    2727 B/op\t      53 allocs/op",
            "extra": "1207 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+sets/lookup_unbanned - ns/op",
            "value": 996582,
            "unit": "ns/op",
            "extra": "1207 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+sets/lookup_unbanned - B/op",
            "value": 2727,
            "unit": "B/op",
            "extra": "1207 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+sets/lookup_unbanned - allocs/op",
            "value": 53,
            "unit": "allocs/op",
            "extra": "1207 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "storm@khaos.systems",
            "name": "Storm Søndergaard",
            "username": "stormsc1"
          },
          "committer": {
            "email": "storm@khaos.systems",
            "name": "Storm Søndergaard",
            "username": "stormsc1"
          },
          "distinct": true,
          "id": "6653653a2119834b909baff6992fb7aae98366b6",
          "message": "Ported from the matick-io repo",
          "timestamp": "2026-09-13T19:04:16+02:00",
          "tree_id": "3b86205c854a34ffe1e9de6a021b8272a1d86f5d",
          "url": "https://github.com/matick-io/authz/commit/6653653a2119834b909baff6992fb7aae98366b6"
        },
        "date": 1789319339670,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkScenarios/wide_team/memory/check_hit",
            "value": 4280800,
            "unit": "ns/op\t  607792 B/op\t      32 allocs/op",
            "extra": "279 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/check_hit - ns/op",
            "value": 4280800,
            "unit": "ns/op",
            "extra": "279 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/check_hit - B/op",
            "value": 607792,
            "unit": "B/op",
            "extra": "279 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/check_hit - allocs/op",
            "value": 32,
            "unit": "allocs/op",
            "extra": "279 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/check_miss",
            "value": 4265848,
            "unit": "ns/op\t  607727 B/op\t      35 allocs/op",
            "extra": "279 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/check_miss - ns/op",
            "value": 4265848,
            "unit": "ns/op",
            "extra": "279 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/check_miss - B/op",
            "value": 607727,
            "unit": "B/op",
            "extra": "279 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/check_miss - allocs/op",
            "value": 35,
            "unit": "allocs/op",
            "extra": "279 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/lookup_one_member",
            "value": 1182901,
            "unit": "ns/op\t    7139 B/op\t     130 allocs/op",
            "extra": "1009 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/lookup_one_member - ns/op",
            "value": 1182901,
            "unit": "ns/op",
            "extra": "1009 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/lookup_one_member - B/op",
            "value": 7139,
            "unit": "B/op",
            "extra": "1009 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/lookup_one_member - allocs/op",
            "value": 130,
            "unit": "allocs/op",
            "extra": "1009 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/subjects_all",
            "value": 5339531,
            "unit": "ns/op\t 1300040 B/op\t     140 allocs/op",
            "extra": "222 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/subjects_all - ns/op",
            "value": 5339531,
            "unit": "ns/op",
            "extra": "222 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/subjects_all - B/op",
            "value": 1300040,
            "unit": "B/op",
            "extra": "222 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/subjects_all - allocs/op",
            "value": 140,
            "unit": "allocs/op",
            "extra": "222 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/bulk_200",
            "value": 6860490,
            "unit": "ns/op\t  713608 B/op\t    1627 allocs/op",
            "extra": "170 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/bulk_200 - ns/op",
            "value": 6860490,
            "unit": "ns/op",
            "extra": "170 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/bulk_200 - B/op",
            "value": 713608,
            "unit": "B/op",
            "extra": "170 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/bulk_200 - allocs/op",
            "value": 1627,
            "unit": "allocs/op",
            "extra": "170 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/toggle_grant",
            "value": 477031,
            "unit": "ns/op\t  989048 B/op\t      29 allocs/op",
            "extra": "2372 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/toggle_grant - ns/op",
            "value": 477031,
            "unit": "ns/op",
            "extra": "2372 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/toggle_grant - B/op",
            "value": 989048,
            "unit": "B/op",
            "extra": "2372 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/memory/toggle_grant - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "2372 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/check_hit",
            "value": 2906496,
            "unit": "ns/op\t 1059034 B/op\t   14082 allocs/op",
            "extra": "429 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/check_hit - ns/op",
            "value": 2906496,
            "unit": "ns/op",
            "extra": "429 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/check_hit - B/op",
            "value": 1059034,
            "unit": "B/op",
            "extra": "429 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/check_hit - allocs/op",
            "value": 14082,
            "unit": "allocs/op",
            "extra": "429 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/check_miss",
            "value": 2976150,
            "unit": "ns/op\t 1059765 B/op\t   14103 allocs/op",
            "extra": "402 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/check_miss - ns/op",
            "value": 2976150,
            "unit": "ns/op",
            "extra": "402 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/check_miss - B/op",
            "value": 1059765,
            "unit": "B/op",
            "extra": "402 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/check_miss - allocs/op",
            "value": 14103,
            "unit": "allocs/op",
            "extra": "402 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/lookup_one_member",
            "value": 6184260,
            "unit": "ns/op\t   46074 B/op\t     745 allocs/op",
            "extra": "189 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/lookup_one_member - ns/op",
            "value": 6184260,
            "unit": "ns/op",
            "extra": "189 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/lookup_one_member - B/op",
            "value": 46074,
            "unit": "B/op",
            "extra": "189 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/lookup_one_member - allocs/op",
            "value": 745,
            "unit": "allocs/op",
            "extra": "189 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/subjects_all",
            "value": 4014877,
            "unit": "ns/op\t 1750192 B/op\t   14209 allocs/op",
            "extra": "298 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/subjects_all - ns/op",
            "value": 4014877,
            "unit": "ns/op",
            "extra": "298 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/subjects_all - B/op",
            "value": 1750192,
            "unit": "B/op",
            "extra": "298 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/subjects_all - allocs/op",
            "value": 14209,
            "unit": "allocs/op",
            "extra": "298 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/bulk_200",
            "value": 5680793,
            "unit": "ns/op\t 1160104 B/op\t   15695 allocs/op",
            "extra": "212 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/bulk_200 - ns/op",
            "value": 5680793,
            "unit": "ns/op",
            "extra": "212 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/bulk_200 - B/op",
            "value": 1160104,
            "unit": "B/op",
            "extra": "212 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/bulk_200 - allocs/op",
            "value": 15695,
            "unit": "allocs/op",
            "extra": "212 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/toggle_grant",
            "value": 2599591,
            "unit": "ns/op\t    7997 B/op\t     145 allocs/op",
            "extra": "463 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/toggle_grant - ns/op",
            "value": 2599591,
            "unit": "ns/op",
            "extra": "463 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/toggle_grant - B/op",
            "value": 7997,
            "unit": "B/op",
            "extra": "463 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres/toggle_grant - allocs/op",
            "value": 145,
            "unit": "allocs/op",
            "extra": "463 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/check_hit",
            "value": 815214,
            "unit": "ns/op\t    4039 B/op\t      53 allocs/op",
            "extra": "1432 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/check_hit - ns/op",
            "value": 815214,
            "unit": "ns/op",
            "extra": "1432 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/check_hit - B/op",
            "value": 4039,
            "unit": "B/op",
            "extra": "1432 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/check_hit - allocs/op",
            "value": 53,
            "unit": "allocs/op",
            "extra": "1432 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/check_miss",
            "value": 1273870,
            "unit": "ns/op\t    6457 B/op\t      74 allocs/op",
            "extra": "948 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/check_miss - ns/op",
            "value": 1273870,
            "unit": "ns/op",
            "extra": "948 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/check_miss - B/op",
            "value": 6457,
            "unit": "B/op",
            "extra": "948 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/check_miss - allocs/op",
            "value": 74,
            "unit": "allocs/op",
            "extra": "948 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/lookup_one_member",
            "value": 1190821,
            "unit": "ns/op\t    2675 B/op\t      53 allocs/op",
            "extra": "1016 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/lookup_one_member - ns/op",
            "value": 1190821,
            "unit": "ns/op",
            "extra": "1016 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/lookup_one_member - B/op",
            "value": 2675,
            "unit": "B/op",
            "extra": "1016 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/lookup_one_member - allocs/op",
            "value": 53,
            "unit": "allocs/op",
            "extra": "1016 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/subjects_all",
            "value": 11194570,
            "unit": "ns/op\t 1534204 B/op\t   14139 allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/subjects_all - ns/op",
            "value": 11194570,
            "unit": "ns/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/subjects_all - B/op",
            "value": 1534204,
            "unit": "B/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/subjects_all - allocs/op",
            "value": 14139,
            "unit": "allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/bulk_200",
            "value": 135169964,
            "unit": "ns/op\t  996104 B/op\t   10915 allocs/op",
            "extra": "8 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/bulk_200 - ns/op",
            "value": 135169964,
            "unit": "ns/op",
            "extra": "8 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/bulk_200 - B/op",
            "value": 996104,
            "unit": "B/op",
            "extra": "8 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/bulk_200 - allocs/op",
            "value": 10915,
            "unit": "allocs/op",
            "extra": "8 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/toggle_grant",
            "value": 2632821,
            "unit": "ns/op\t    7961 B/op\t     145 allocs/op",
            "extra": "464 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/toggle_grant - ns/op",
            "value": 2632821,
            "unit": "ns/op",
            "extra": "464 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/toggle_grant - B/op",
            "value": 7961,
            "unit": "B/op",
            "extra": "464 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+closure/toggle_grant - allocs/op",
            "value": 145,
            "unit": "allocs/op",
            "extra": "464 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/check_hit",
            "value": 596209,
            "unit": "ns/op\t    1349 B/op\t      30 allocs/op",
            "extra": "1993 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/check_hit - ns/op",
            "value": 596209,
            "unit": "ns/op",
            "extra": "1993 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/check_hit - B/op",
            "value": 1349,
            "unit": "B/op",
            "extra": "1993 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/check_hit - allocs/op",
            "value": 30,
            "unit": "allocs/op",
            "extra": "1993 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/check_miss",
            "value": 580651,
            "unit": "ns/op\t    1337 B/op\t      30 allocs/op",
            "extra": "2041 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/check_miss - ns/op",
            "value": 580651,
            "unit": "ns/op",
            "extra": "2041 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/check_miss - B/op",
            "value": 1337,
            "unit": "B/op",
            "extra": "2041 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/check_miss - allocs/op",
            "value": 30,
            "unit": "allocs/op",
            "extra": "2041 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/lookup_one_member",
            "value": 581521,
            "unit": "ns/op\t    1682 B/op\t      33 allocs/op",
            "extra": "1792 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/lookup_one_member - ns/op",
            "value": 581521,
            "unit": "ns/op",
            "extra": "1792 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/lookup_one_member - B/op",
            "value": 1682,
            "unit": "B/op",
            "extra": "1792 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/lookup_one_member - allocs/op",
            "value": 33,
            "unit": "allocs/op",
            "extra": "1792 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/subjects_all",
            "value": 4934757,
            "unit": "ns/op\t  432628 B/op\t    6076 allocs/op",
            "extra": "246 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/subjects_all - ns/op",
            "value": 4934757,
            "unit": "ns/op",
            "extra": "246 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/subjects_all - B/op",
            "value": 432628,
            "unit": "B/op",
            "extra": "246 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/subjects_all - allocs/op",
            "value": 6076,
            "unit": "allocs/op",
            "extra": "246 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/bulk_200",
            "value": 47695003,
            "unit": "ns/op\t  212985 B/op\t    4210 allocs/op",
            "extra": "24 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/bulk_200 - ns/op",
            "value": 47695003,
            "unit": "ns/op",
            "extra": "24 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/bulk_200 - B/op",
            "value": 212985,
            "unit": "B/op",
            "extra": "24 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/bulk_200 - allocs/op",
            "value": 4210,
            "unit": "allocs/op",
            "extra": "24 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/toggle_grant",
            "value": 3666348,
            "unit": "ns/op\t   10574 B/op\t     209 allocs/op",
            "extra": "324 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/toggle_grant - ns/op",
            "value": 3666348,
            "unit": "ns/op",
            "extra": "324 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/toggle_grant - B/op",
            "value": 10574,
            "unit": "B/op",
            "extra": "324 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wide_team/postgres+sets/toggle_grant - allocs/op",
            "value": 209,
            "unit": "allocs/op",
            "extra": "324 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/check_hit",
            "value": 315271,
            "unit": "ns/op\t   36612 B/op\t     531 allocs/op",
            "extra": "3768 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/check_hit - ns/op",
            "value": 315271,
            "unit": "ns/op",
            "extra": "3768 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/check_hit - B/op",
            "value": 36612,
            "unit": "B/op",
            "extra": "3768 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/check_hit - allocs/op",
            "value": 531,
            "unit": "allocs/op",
            "extra": "3768 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/check_miss",
            "value": 320384,
            "unit": "ns/op\t   36911 B/op\t     534 allocs/op",
            "extra": "3780 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/check_miss - ns/op",
            "value": 320384,
            "unit": "ns/op",
            "extra": "3780 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/check_miss - B/op",
            "value": 36911,
            "unit": "B/op",
            "extra": "3780 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/check_miss - allocs/op",
            "value": 534,
            "unit": "allocs/op",
            "extra": "3780 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/lookup_all_teams",
            "value": 9585434,
            "unit": "ns/op\t 1942789 B/op\t    2543 allocs/op",
            "extra": "124 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/lookup_all_teams - ns/op",
            "value": 9585434,
            "unit": "ns/op",
            "extra": "124 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/lookup_all_teams - B/op",
            "value": 1942789,
            "unit": "B/op",
            "extra": "124 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/lookup_all_teams - allocs/op",
            "value": 2543,
            "unit": "allocs/op",
            "extra": "124 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/subjects_at_top",
            "value": 364528,
            "unit": "ns/op\t   82438 B/op\t    1046 allocs/op",
            "extra": "3327 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/subjects_at_top - ns/op",
            "value": 364528,
            "unit": "ns/op",
            "extra": "3327 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/subjects_at_top - B/op",
            "value": 82438,
            "unit": "B/op",
            "extra": "3327 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/subjects_at_top - allocs/op",
            "value": 1046,
            "unit": "allocs/op",
            "extra": "3327 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/toggle_top_edge",
            "value": 23177,
            "unit": "ns/op\t   34095 B/op\t      17 allocs/op",
            "extra": "52987 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/toggle_top_edge - ns/op",
            "value": 23177,
            "unit": "ns/op",
            "extra": "52987 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/toggle_top_edge - B/op",
            "value": 34095,
            "unit": "B/op",
            "extra": "52987 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/toggle_top_edge - allocs/op",
            "value": 17,
            "unit": "allocs/op",
            "extra": "52987 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/toggle_bottom_edge",
            "value": 23808,
            "unit": "ns/op\t   34031 B/op\t      17 allocs/op",
            "extra": "46795 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/toggle_bottom_edge - ns/op",
            "value": 23808,
            "unit": "ns/op",
            "extra": "46795 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/toggle_bottom_edge - B/op",
            "value": 34031,
            "unit": "B/op",
            "extra": "46795 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/memory/toggle_bottom_edge - allocs/op",
            "value": 17,
            "unit": "allocs/op",
            "extra": "46795 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/check_hit",
            "value": 26946946,
            "unit": "ns/op\t  187978 B/op\t    3262 allocs/op",
            "extra": "43 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/check_hit - ns/op",
            "value": 26946946,
            "unit": "ns/op",
            "extra": "43 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/check_hit - B/op",
            "value": 187978,
            "unit": "B/op",
            "extra": "43 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/check_hit - allocs/op",
            "value": 3262,
            "unit": "allocs/op",
            "extra": "43 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/check_miss",
            "value": 26736496,
            "unit": "ns/op\t  189342 B/op\t    3283 allocs/op",
            "extra": "42 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/check_miss - ns/op",
            "value": 26736496,
            "unit": "ns/op",
            "extra": "42 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/check_miss - B/op",
            "value": 189342,
            "unit": "B/op",
            "extra": "42 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/check_miss - allocs/op",
            "value": 3283,
            "unit": "allocs/op",
            "extra": "42 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/lookup_all_teams",
            "value": 70498376,
            "unit": "ns/op\t 3601244 B/op\t   53502 allocs/op",
            "extra": "15 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/lookup_all_teams - ns/op",
            "value": 70498376,
            "unit": "ns/op",
            "extra": "15 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/lookup_all_teams - B/op",
            "value": 3601244,
            "unit": "B/op",
            "extra": "15 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/lookup_all_teams - allocs/op",
            "value": 53502,
            "unit": "allocs/op",
            "extra": "15 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/subjects_at_top",
            "value": 27040552,
            "unit": "ns/op\t  234429 B/op\t    3794 allocs/op",
            "extra": "44 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/subjects_at_top - ns/op",
            "value": 27040552,
            "unit": "ns/op",
            "extra": "44 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/subjects_at_top - B/op",
            "value": 234429,
            "unit": "B/op",
            "extra": "44 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/subjects_at_top - allocs/op",
            "value": 3794,
            "unit": "allocs/op",
            "extra": "44 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/toggle_top_edge",
            "value": 2657409,
            "unit": "ns/op\t    8177 B/op\t     149 allocs/op",
            "extra": "457 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/toggle_top_edge - ns/op",
            "value": 2657409,
            "unit": "ns/op",
            "extra": "457 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/toggle_top_edge - B/op",
            "value": 8177,
            "unit": "B/op",
            "extra": "457 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/toggle_top_edge - allocs/op",
            "value": 149,
            "unit": "allocs/op",
            "extra": "457 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/toggle_bottom_edge",
            "value": 2663582,
            "unit": "ns/op\t    8011 B/op\t     149 allocs/op",
            "extra": "451 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/toggle_bottom_edge - ns/op",
            "value": 2663582,
            "unit": "ns/op",
            "extra": "451 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/toggle_bottom_edge - B/op",
            "value": 8011,
            "unit": "B/op",
            "extra": "451 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres/toggle_bottom_edge - allocs/op",
            "value": 149,
            "unit": "allocs/op",
            "extra": "451 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/check_hit",
            "value": 1145875,
            "unit": "ns/op\t    3994 B/op\t      53 allocs/op",
            "extra": "1045 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/check_hit - ns/op",
            "value": 1145875,
            "unit": "ns/op",
            "extra": "1045 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/check_hit - B/op",
            "value": 3994,
            "unit": "B/op",
            "extra": "1045 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/check_hit - allocs/op",
            "value": 53,
            "unit": "allocs/op",
            "extra": "1045 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/check_miss",
            "value": 1522843,
            "unit": "ns/op\t    6349 B/op\t      74 allocs/op",
            "extra": "783 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/check_miss - ns/op",
            "value": 1522843,
            "unit": "ns/op",
            "extra": "783 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/check_miss - B/op",
            "value": 6349,
            "unit": "B/op",
            "extra": "783 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/check_miss - allocs/op",
            "value": 74,
            "unit": "allocs/op",
            "extra": "783 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/lookup_all_teams",
            "value": 16284378,
            "unit": "ns/op\t   19196 B/op\t     347 allocs/op",
            "extra": "69 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/lookup_all_teams - ns/op",
            "value": 16284378,
            "unit": "ns/op",
            "extra": "69 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/lookup_all_teams - B/op",
            "value": 19196,
            "unit": "B/op",
            "extra": "69 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/lookup_all_teams - allocs/op",
            "value": 347,
            "unit": "allocs/op",
            "extra": "69 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/subjects_at_top",
            "value": 1470153,
            "unit": "ns/op\t    5335 B/op\t      72 allocs/op",
            "extra": "810 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/subjects_at_top - ns/op",
            "value": 1470153,
            "unit": "ns/op",
            "extra": "810 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/subjects_at_top - B/op",
            "value": 5335,
            "unit": "B/op",
            "extra": "810 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/subjects_at_top - allocs/op",
            "value": 72,
            "unit": "allocs/op",
            "extra": "810 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/toggle_top_edge",
            "value": 63385828,
            "unit": "ns/op\t  191416 B/op\t    2271 allocs/op",
            "extra": "19 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/toggle_top_edge - ns/op",
            "value": 63385828,
            "unit": "ns/op",
            "extra": "19 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/toggle_top_edge - B/op",
            "value": 191416,
            "unit": "B/op",
            "extra": "19 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/toggle_top_edge - allocs/op",
            "value": 2271,
            "unit": "allocs/op",
            "extra": "19 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/toggle_bottom_edge",
            "value": 7885138,
            "unit": "ns/op\t   74954 B/op\t    1102 allocs/op",
            "extra": "152 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/toggle_bottom_edge - ns/op",
            "value": 7885138,
            "unit": "ns/op",
            "extra": "152 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/toggle_bottom_edge - B/op",
            "value": 74954,
            "unit": "B/op",
            "extra": "152 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+closure/toggle_bottom_edge - allocs/op",
            "value": 1102,
            "unit": "allocs/op",
            "extra": "152 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/check_hit",
            "value": 671470,
            "unit": "ns/op\t    1330 B/op\t      30 allocs/op",
            "extra": "1758 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/check_hit - ns/op",
            "value": 671470,
            "unit": "ns/op",
            "extra": "1758 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/check_hit - B/op",
            "value": 1330,
            "unit": "B/op",
            "extra": "1758 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/check_hit - allocs/op",
            "value": 30,
            "unit": "allocs/op",
            "extra": "1758 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/check_miss",
            "value": 582276,
            "unit": "ns/op\t    1338 B/op\t      30 allocs/op",
            "extra": "2130 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/check_miss - ns/op",
            "value": 582276,
            "unit": "ns/op",
            "extra": "2130 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/check_miss - B/op",
            "value": 1338,
            "unit": "B/op",
            "extra": "2130 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/check_miss - allocs/op",
            "value": 30,
            "unit": "allocs/op",
            "extra": "2130 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/lookup_all_teams",
            "value": 16260479,
            "unit": "ns/op\t   19196 B/op\t     347 allocs/op",
            "extra": "69 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/lookup_all_teams - ns/op",
            "value": 16260479,
            "unit": "ns/op",
            "extra": "69 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/lookup_all_teams - B/op",
            "value": 19196,
            "unit": "B/op",
            "extra": "69 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/lookup_all_teams - allocs/op",
            "value": 347,
            "unit": "allocs/op",
            "extra": "69 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/subjects_at_top",
            "value": 1377966,
            "unit": "ns/op\t    2043 B/op\t      38 allocs/op",
            "extra": "867 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/subjects_at_top - ns/op",
            "value": 1377966,
            "unit": "ns/op",
            "extra": "867 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/subjects_at_top - B/op",
            "value": 2043,
            "unit": "B/op",
            "extra": "867 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/subjects_at_top - allocs/op",
            "value": 38,
            "unit": "allocs/op",
            "extra": "867 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/toggle_top_edge",
            "value": 63166205,
            "unit": "ns/op\t  193291 B/op\t    2387 allocs/op",
            "extra": "18 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/toggle_top_edge - ns/op",
            "value": 63166205,
            "unit": "ns/op",
            "extra": "18 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/toggle_top_edge - B/op",
            "value": 193291,
            "unit": "B/op",
            "extra": "18 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/toggle_top_edge - allocs/op",
            "value": 2387,
            "unit": "allocs/op",
            "extra": "18 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/toggle_bottom_edge",
            "value": 8576832,
            "unit": "ns/op\t   76121 B/op\t    1156 allocs/op",
            "extra": "140 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/toggle_bottom_edge - ns/op",
            "value": 8576832,
            "unit": "ns/op",
            "extra": "140 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/toggle_bottom_edge - B/op",
            "value": 76121,
            "unit": "B/op",
            "extra": "140 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/deep_nesting/postgres+sets/toggle_bottom_edge - allocs/op",
            "value": 1156,
            "unit": "allocs/op",
            "extra": "140 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/memory/lookup_hub",
            "value": 1377390,
            "unit": "ns/op\t   87116 B/op\t     148 allocs/op",
            "extra": "855 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/memory/lookup_hub - ns/op",
            "value": 1377390,
            "unit": "ns/op",
            "extra": "855 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/memory/lookup_hub - B/op",
            "value": 87116,
            "unit": "B/op",
            "extra": "855 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/memory/lookup_hub - allocs/op",
            "value": 148,
            "unit": "allocs/op",
            "extra": "855 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/memory/lookup_single_owner",
            "value": 720943,
            "unit": "ns/op\t    2664 B/op\t      50 allocs/op",
            "extra": "1662 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/memory/lookup_single_owner - ns/op",
            "value": 720943,
            "unit": "ns/op",
            "extra": "1662 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/memory/lookup_single_owner - B/op",
            "value": 2664,
            "unit": "B/op",
            "extra": "1662 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/memory/lookup_single_owner - allocs/op",
            "value": 50,
            "unit": "allocs/op",
            "extra": "1662 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/memory/check_miss",
            "value": 236215,
            "unit": "ns/op\t    1120 B/op\t      16 allocs/op",
            "extra": "4978 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/memory/check_miss - ns/op",
            "value": 236215,
            "unit": "ns/op",
            "extra": "4978 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/memory/check_miss - B/op",
            "value": 1120,
            "unit": "B/op",
            "extra": "4978 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/memory/check_miss - allocs/op",
            "value": 16,
            "unit": "allocs/op",
            "extra": "4978 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres/lookup_hub",
            "value": 3476771,
            "unit": "ns/op\t  148706 B/op\t    1779 allocs/op",
            "extra": "337 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres/lookup_hub - ns/op",
            "value": 3476771,
            "unit": "ns/op",
            "extra": "337 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres/lookup_hub - B/op",
            "value": 148706,
            "unit": "B/op",
            "extra": "337 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres/lookup_hub - allocs/op",
            "value": 1779,
            "unit": "allocs/op",
            "extra": "337 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres/lookup_single_owner",
            "value": 1988260,
            "unit": "ns/op\t   12984 B/op\t     209 allocs/op",
            "extra": "622 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres/lookup_single_owner - ns/op",
            "value": 1988260,
            "unit": "ns/op",
            "extra": "622 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres/lookup_single_owner - B/op",
            "value": 12984,
            "unit": "B/op",
            "extra": "622 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres/lookup_single_owner - allocs/op",
            "value": 209,
            "unit": "allocs/op",
            "extra": "622 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres/check_miss",
            "value": 886190,
            "unit": "ns/op\t    3910 B/op\t      65 allocs/op",
            "extra": "1372 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres/check_miss - ns/op",
            "value": 886190,
            "unit": "ns/op",
            "extra": "1372 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres/check_miss - B/op",
            "value": 3910,
            "unit": "B/op",
            "extra": "1372 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres/check_miss - allocs/op",
            "value": 65,
            "unit": "allocs/op",
            "extra": "1372 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+closure/lookup_hub",
            "value": 4649729,
            "unit": "ns/op\t   13973 B/op\t     221 allocs/op",
            "extra": "260 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+closure/lookup_hub - ns/op",
            "value": 4649729,
            "unit": "ns/op",
            "extra": "260 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+closure/lookup_hub - B/op",
            "value": 13973,
            "unit": "B/op",
            "extra": "260 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+closure/lookup_hub - allocs/op",
            "value": 221,
            "unit": "allocs/op",
            "extra": "260 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+closure/lookup_single_owner",
            "value": 4453822,
            "unit": "ns/op\t    2968 B/op\t      54 allocs/op",
            "extra": "270 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+closure/lookup_single_owner - ns/op",
            "value": 4453822,
            "unit": "ns/op",
            "extra": "270 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+closure/lookup_single_owner - B/op",
            "value": 2968,
            "unit": "B/op",
            "extra": "270 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+closure/lookup_single_owner - allocs/op",
            "value": 54,
            "unit": "allocs/op",
            "extra": "270 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+closure/check_miss",
            "value": 3361509,
            "unit": "ns/op\t    6399 B/op\t      74 allocs/op",
            "extra": "358 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+closure/check_miss - ns/op",
            "value": 3361509,
            "unit": "ns/op",
            "extra": "358 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+closure/check_miss - B/op",
            "value": 6399,
            "unit": "B/op",
            "extra": "358 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+closure/check_miss - allocs/op",
            "value": 74,
            "unit": "allocs/op",
            "extra": "358 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+sets/lookup_hub",
            "value": 771098,
            "unit": "ns/op\t    9854 B/op\t     194 allocs/op",
            "extra": "1527 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+sets/lookup_hub - ns/op",
            "value": 771098,
            "unit": "ns/op",
            "extra": "1527 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+sets/lookup_hub - B/op",
            "value": 9854,
            "unit": "B/op",
            "extra": "1527 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+sets/lookup_hub - allocs/op",
            "value": 194,
            "unit": "allocs/op",
            "extra": "1527 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+sets/lookup_single_owner",
            "value": 586076,
            "unit": "ns/op\t    1690 B/op\t      34 allocs/op",
            "extra": "2050 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+sets/lookup_single_owner - ns/op",
            "value": 586076,
            "unit": "ns/op",
            "extra": "2050 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+sets/lookup_single_owner - B/op",
            "value": 1690,
            "unit": "B/op",
            "extra": "2050 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+sets/lookup_single_owner - allocs/op",
            "value": 34,
            "unit": "allocs/op",
            "extra": "2050 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+sets/check_miss",
            "value": 707208,
            "unit": "ns/op\t    1330 B/op\t      30 allocs/op",
            "extra": "1682 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+sets/check_miss - ns/op",
            "value": 707208,
            "unit": "ns/op",
            "extra": "1682 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+sets/check_miss - B/op",
            "value": 1330,
            "unit": "B/op",
            "extra": "1682 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/hub_user/postgres+sets/check_miss - allocs/op",
            "value": 30,
            "unit": "allocs/op",
            "extra": "1682 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/memory/lookup_needle",
            "value": 2912798,
            "unit": "ns/op\t    2846 B/op\t      50 allocs/op",
            "extra": "412 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/memory/lookup_needle - ns/op",
            "value": 2912798,
            "unit": "ns/op",
            "extra": "412 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/memory/lookup_needle - B/op",
            "value": 2846,
            "unit": "B/op",
            "extra": "412 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/memory/lookup_needle - allocs/op",
            "value": 50,
            "unit": "allocs/op",
            "extra": "412 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/memory/check_needle",
            "value": 1103945,
            "unit": "ns/op\t    1213 B/op\t      16 allocs/op",
            "extra": "1102 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/memory/check_needle - ns/op",
            "value": 1103945,
            "unit": "ns/op",
            "extra": "1102 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/memory/check_needle - B/op",
            "value": 1213,
            "unit": "B/op",
            "extra": "1102 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/memory/check_needle - allocs/op",
            "value": 16,
            "unit": "allocs/op",
            "extra": "1102 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/memory/lookup_nobody",
            "value": 1453127,
            "unit": "ns/op\t    1126 B/op\t      24 allocs/op",
            "extra": "823 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/memory/lookup_nobody - ns/op",
            "value": 1453127,
            "unit": "ns/op",
            "extra": "823 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/memory/lookup_nobody - B/op",
            "value": 1126,
            "unit": "B/op",
            "extra": "823 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/memory/lookup_nobody - allocs/op",
            "value": 24,
            "unit": "allocs/op",
            "extra": "823 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres/lookup_needle",
            "value": 1979679,
            "unit": "ns/op\t   12889 B/op\t     209 allocs/op",
            "extra": "601 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres/lookup_needle - ns/op",
            "value": 1979679,
            "unit": "ns/op",
            "extra": "601 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres/lookup_needle - B/op",
            "value": 12889,
            "unit": "B/op",
            "extra": "601 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres/lookup_needle - allocs/op",
            "value": 209,
            "unit": "allocs/op",
            "extra": "601 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres/check_needle",
            "value": 882568,
            "unit": "ns/op\t    3951 B/op\t      65 allocs/op",
            "extra": "1338 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres/check_needle - ns/op",
            "value": 882568,
            "unit": "ns/op",
            "extra": "1338 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres/check_needle - B/op",
            "value": 3951,
            "unit": "B/op",
            "extra": "1338 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres/check_needle - allocs/op",
            "value": 65,
            "unit": "allocs/op",
            "extra": "1338 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres/lookup_nobody",
            "value": 1164470,
            "unit": "ns/op\t    5982 B/op\t      98 allocs/op",
            "extra": "981 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres/lookup_nobody - ns/op",
            "value": 1164470,
            "unit": "ns/op",
            "extra": "981 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres/lookup_nobody - B/op",
            "value": 5982,
            "unit": "B/op",
            "extra": "981 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres/lookup_nobody - allocs/op",
            "value": 98,
            "unit": "allocs/op",
            "extra": "981 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+closure/lookup_needle",
            "value": 1204967,
            "unit": "ns/op\t    2718 B/op\t      54 allocs/op",
            "extra": "998 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+closure/lookup_needle - ns/op",
            "value": 1204967,
            "unit": "ns/op",
            "extra": "998 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+closure/lookup_needle - B/op",
            "value": 2718,
            "unit": "B/op",
            "extra": "998 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+closure/lookup_needle - allocs/op",
            "value": 54,
            "unit": "allocs/op",
            "extra": "998 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+closure/check_needle",
            "value": 1295756,
            "unit": "ns/op\t    6910 B/op\t      84 allocs/op",
            "extra": "921 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+closure/check_needle - ns/op",
            "value": 1295756,
            "unit": "ns/op",
            "extra": "921 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+closure/check_needle - B/op",
            "value": 6910,
            "unit": "B/op",
            "extra": "921 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+closure/check_needle - allocs/op",
            "value": 84,
            "unit": "allocs/op",
            "extra": "921 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+closure/lookup_nobody",
            "value": 1211968,
            "unit": "ns/op\t    2163 B/op\t      45 allocs/op",
            "extra": "1009 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+closure/lookup_nobody - ns/op",
            "value": 1211968,
            "unit": "ns/op",
            "extra": "1009 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+closure/lookup_nobody - B/op",
            "value": 2163,
            "unit": "B/op",
            "extra": "1009 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+closure/lookup_nobody - allocs/op",
            "value": 45,
            "unit": "allocs/op",
            "extra": "1009 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+sets/lookup_needle",
            "value": 587628,
            "unit": "ns/op\t    1708 B/op\t      34 allocs/op",
            "extra": "2034 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+sets/lookup_needle - ns/op",
            "value": 587628,
            "unit": "ns/op",
            "extra": "2034 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+sets/lookup_needle - B/op",
            "value": 1708,
            "unit": "B/op",
            "extra": "2034 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+sets/lookup_needle - allocs/op",
            "value": 34,
            "unit": "allocs/op",
            "extra": "2034 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+sets/check_needle",
            "value": 596570,
            "unit": "ns/op\t    1337 B/op\t      30 allocs/op",
            "extra": "2019 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+sets/check_needle - ns/op",
            "value": 596570,
            "unit": "ns/op",
            "extra": "2019 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+sets/check_needle - B/op",
            "value": 1337,
            "unit": "B/op",
            "extra": "2019 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+sets/check_needle - allocs/op",
            "value": 30,
            "unit": "allocs/op",
            "extra": "2019 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+sets/lookup_nobody",
            "value": 566321,
            "unit": "ns/op\t    1379 B/op\t      26 allocs/op",
            "extra": "2108 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+sets/lookup_nobody - ns/op",
            "value": 566321,
            "unit": "ns/op",
            "extra": "2108 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+sets/lookup_nobody - B/op",
            "value": 1379,
            "unit": "B/op",
            "extra": "2108 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/needle/postgres+sets/lookup_nobody - allocs/op",
            "value": 26,
            "unit": "allocs/op",
            "extra": "2108 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/memory/check_last",
            "value": 12095052,
            "unit": "ns/op\t  645062 B/op\t    9751 allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/memory/check_last - ns/op",
            "value": 12095052,
            "unit": "ns/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/memory/check_last - B/op",
            "value": 645062,
            "unit": "B/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/memory/check_last - allocs/op",
            "value": 9751,
            "unit": "allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/memory/check_miss",
            "value": 13254599,
            "unit": "ns/op\t  731812 B/op\t   10077 allocs/op",
            "extra": "87 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/memory/check_miss - ns/op",
            "value": 13254599,
            "unit": "ns/op",
            "extra": "87 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/memory/check_miss - B/op",
            "value": 731812,
            "unit": "B/op",
            "extra": "87 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/memory/check_miss - allocs/op",
            "value": 10077,
            "unit": "allocs/op",
            "extra": "87 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/memory/subjects_teams",
            "value": 28562196,
            "unit": "ns/op\t11984621 B/op\t   18748 allocs/op",
            "extra": "39 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/memory/subjects_teams - ns/op",
            "value": 28562196,
            "unit": "ns/op",
            "extra": "39 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/memory/subjects_teams - B/op",
            "value": 11984621,
            "unit": "B/op",
            "extra": "39 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/memory/subjects_teams - allocs/op",
            "value": 18748,
            "unit": "allocs/op",
            "extra": "39 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/memory/subjects_users",
            "value": 28232467,
            "unit": "ns/op\t11987133 B/op\t   18802 allocs/op",
            "extra": "42 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/memory/subjects_users - ns/op",
            "value": 28232467,
            "unit": "ns/op",
            "extra": "42 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/memory/subjects_users - B/op",
            "value": 11987133,
            "unit": "B/op",
            "extra": "42 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/memory/subjects_users - allocs/op",
            "value": 18802,
            "unit": "allocs/op",
            "extra": "42 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/memory/lookup_one",
            "value": 700289,
            "unit": "ns/op\t    7193 B/op\t     130 allocs/op",
            "extra": "1742 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/memory/lookup_one - ns/op",
            "value": 700289,
            "unit": "ns/op",
            "extra": "1742 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/memory/lookup_one - B/op",
            "value": 7193,
            "unit": "B/op",
            "extra": "1742 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/memory/lookup_one - allocs/op",
            "value": 130,
            "unit": "allocs/op",
            "extra": "1742 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres/check_last",
            "value": 116786883,
            "unit": "ns/op\t 1057393 B/op\t   17371 allocs/op",
            "extra": "9 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres/check_last - ns/op",
            "value": 116786883,
            "unit": "ns/op",
            "extra": "9 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres/check_last - B/op",
            "value": 1057393,
            "unit": "B/op",
            "extra": "9 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres/check_last - allocs/op",
            "value": 17371,
            "unit": "allocs/op",
            "extra": "9 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres/check_miss",
            "value": 133169913,
            "unit": "ns/op\t 1236202 B/op\t   19103 allocs/op",
            "extra": "8 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres/check_miss - ns/op",
            "value": 133169913,
            "unit": "ns/op",
            "extra": "8 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres/check_miss - B/op",
            "value": 1236202,
            "unit": "B/op",
            "extra": "8 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres/check_miss - allocs/op",
            "value": 19103,
            "unit": "allocs/op",
            "extra": "8 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres/subjects_teams",
            "value": 149245785,
            "unit": "ns/op\t12470267 B/op\t   27828 allocs/op",
            "extra": "7 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres/subjects_teams - ns/op",
            "value": 149245785,
            "unit": "ns/op",
            "extra": "7 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres/subjects_teams - B/op",
            "value": 12470267,
            "unit": "B/op",
            "extra": "7 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres/subjects_teams - allocs/op",
            "value": 27828,
            "unit": "allocs/op",
            "extra": "7 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres/subjects_users",
            "value": 152985342,
            "unit": "ns/op\t12471776 B/op\t   27855 allocs/op",
            "extra": "7 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres/subjects_users - ns/op",
            "value": 152985342,
            "unit": "ns/op",
            "extra": "7 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres/subjects_users - B/op",
            "value": 12471776,
            "unit": "B/op",
            "extra": "7 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres/subjects_users - allocs/op",
            "value": 27855,
            "unit": "allocs/op",
            "extra": "7 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres/lookup_one",
            "value": 6337852,
            "unit": "ns/op\t   45853 B/op\t     745 allocs/op",
            "extra": "193 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres/lookup_one - ns/op",
            "value": 6337852,
            "unit": "ns/op",
            "extra": "193 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres/lookup_one - B/op",
            "value": 45853,
            "unit": "B/op",
            "extra": "193 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres/lookup_one - allocs/op",
            "value": 745,
            "unit": "allocs/op",
            "extra": "193 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+closure/check_last",
            "value": 2333073,
            "unit": "ns/op\t    3997 B/op\t      53 allocs/op",
            "extra": "510 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+closure/check_last - ns/op",
            "value": 2333073,
            "unit": "ns/op",
            "extra": "510 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+closure/check_last - B/op",
            "value": 3997,
            "unit": "B/op",
            "extra": "510 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+closure/check_last - allocs/op",
            "value": 53,
            "unit": "allocs/op",
            "extra": "510 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+closure/check_miss",
            "value": 2969560,
            "unit": "ns/op\t    6393 B/op\t      74 allocs/op",
            "extra": "403 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+closure/check_miss - ns/op",
            "value": 2969560,
            "unit": "ns/op",
            "extra": "403 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+closure/check_miss - B/op",
            "value": 6393,
            "unit": "B/op",
            "extra": "403 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+closure/check_miss - allocs/op",
            "value": 74,
            "unit": "allocs/op",
            "extra": "403 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+closure/subjects_teams",
            "value": 3034485,
            "unit": "ns/op\t  312236 B/op\t    3566 allocs/op",
            "extra": "382 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+closure/subjects_teams - ns/op",
            "value": 3034485,
            "unit": "ns/op",
            "extra": "382 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+closure/subjects_teams - B/op",
            "value": 312236,
            "unit": "B/op",
            "extra": "382 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+closure/subjects_teams - allocs/op",
            "value": 3566,
            "unit": "allocs/op",
            "extra": "382 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+closure/subjects_users",
            "value": 4698474,
            "unit": "ns/op\t  363853 B/op\t    3605 allocs/op",
            "extra": "254 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+closure/subjects_users - ns/op",
            "value": 4698474,
            "unit": "ns/op",
            "extra": "254 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+closure/subjects_users - B/op",
            "value": 363853,
            "unit": "B/op",
            "extra": "254 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+closure/subjects_users - allocs/op",
            "value": 3605,
            "unit": "allocs/op",
            "extra": "254 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+closure/lookup_one",
            "value": 1517397,
            "unit": "ns/op\t    2674 B/op\t      53 allocs/op",
            "extra": "787 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+closure/lookup_one - ns/op",
            "value": 1517397,
            "unit": "ns/op",
            "extra": "787 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+closure/lookup_one - B/op",
            "value": 2674,
            "unit": "B/op",
            "extra": "787 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+closure/lookup_one - allocs/op",
            "value": 53,
            "unit": "allocs/op",
            "extra": "787 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+sets/check_last",
            "value": 601736,
            "unit": "ns/op\t    1330 B/op\t      30 allocs/op",
            "extra": "2036 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+sets/check_last - ns/op",
            "value": 601736,
            "unit": "ns/op",
            "extra": "2036 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+sets/check_last - B/op",
            "value": 1330,
            "unit": "B/op",
            "extra": "2036 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+sets/check_last - allocs/op",
            "value": 30,
            "unit": "allocs/op",
            "extra": "2036 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+sets/check_miss",
            "value": 580627,
            "unit": "ns/op\t    1355 B/op\t      30 allocs/op",
            "extra": "2089 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+sets/check_miss - ns/op",
            "value": 580627,
            "unit": "ns/op",
            "extra": "2089 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+sets/check_miss - B/op",
            "value": 1355,
            "unit": "B/op",
            "extra": "2089 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+sets/check_miss - allocs/op",
            "value": 30,
            "unit": "allocs/op",
            "extra": "2089 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+sets/subjects_teams",
            "value": 3004236,
            "unit": "ns/op\t  311706 B/op\t    3566 allocs/op",
            "extra": "397 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+sets/subjects_teams - ns/op",
            "value": 3004236,
            "unit": "ns/op",
            "extra": "397 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+sets/subjects_teams - B/op",
            "value": 311706,
            "unit": "B/op",
            "extra": "397 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+sets/subjects_teams - allocs/op",
            "value": 3566,
            "unit": "allocs/op",
            "extra": "397 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+sets/subjects_users",
            "value": 1998326,
            "unit": "ns/op\t  102211 B/op\t    1559 allocs/op",
            "extra": "597 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+sets/subjects_users - ns/op",
            "value": 1998326,
            "unit": "ns/op",
            "extra": "597 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+sets/subjects_users - B/op",
            "value": 102211,
            "unit": "B/op",
            "extra": "597 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+sets/subjects_users - allocs/op",
            "value": 1559,
            "unit": "allocs/op",
            "extra": "597 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+sets/lookup_one",
            "value": 592622,
            "unit": "ns/op\t    1718 B/op\t      33 allocs/op",
            "extra": "2109 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+sets/lookup_one - ns/op",
            "value": 592622,
            "unit": "ns/op",
            "extra": "2109 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+sets/lookup_one - B/op",
            "value": 1718,
            "unit": "B/op",
            "extra": "2109 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/fan_in/postgres+sets/lookup_one - allocs/op",
            "value": 33,
            "unit": "allocs/op",
            "extra": "2109 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/memory/check_top",
            "value": 240214,
            "unit": "ns/op\t   47424 B/op\t     528 allocs/op",
            "extra": "4878 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/memory/check_top - ns/op",
            "value": 240214,
            "unit": "ns/op",
            "extra": "4878 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/memory/check_top - B/op",
            "value": 47424,
            "unit": "B/op",
            "extra": "4878 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/memory/check_top - allocs/op",
            "value": 528,
            "unit": "allocs/op",
            "extra": "4878 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/memory/lookup_all_layers",
            "value": 6434874,
            "unit": "ns/op\t 2588432 B/op\t   40660 allocs/op",
            "extra": "184 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/memory/lookup_all_layers - ns/op",
            "value": 6434874,
            "unit": "ns/op",
            "extra": "184 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/memory/lookup_all_layers - B/op",
            "value": 2588432,
            "unit": "B/op",
            "extra": "184 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/memory/lookup_all_layers - allocs/op",
            "value": 40660,
            "unit": "allocs/op",
            "extra": "184 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/memory/toggle_bottom_edge",
            "value": 282978,
            "unit": "ns/op\t  495963 B/op\t      22 allocs/op",
            "extra": "4089 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/memory/toggle_bottom_edge - ns/op",
            "value": 282978,
            "unit": "ns/op",
            "extra": "4089 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/memory/toggle_bottom_edge - B/op",
            "value": 495963,
            "unit": "B/op",
            "extra": "4089 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/memory/toggle_bottom_edge - allocs/op",
            "value": 22,
            "unit": "allocs/op",
            "extra": "4089 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres/check_top",
            "value": 1792811,
            "unit": "ns/op\t   44905 B/op\t     642 allocs/op",
            "extra": "668 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres/check_top - ns/op",
            "value": 1792811,
            "unit": "ns/op",
            "extra": "668 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres/check_top - B/op",
            "value": 44905,
            "unit": "B/op",
            "extra": "668 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres/check_top - allocs/op",
            "value": 642,
            "unit": "allocs/op",
            "extra": "668 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres/lookup_all_layers",
            "value": 7755725,
            "unit": "ns/op\t 1134390 B/op\t   17151 allocs/op",
            "extra": "153 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres/lookup_all_layers - ns/op",
            "value": 7755725,
            "unit": "ns/op",
            "extra": "153 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres/lookup_all_layers - B/op",
            "value": 1134390,
            "unit": "B/op",
            "extra": "153 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres/lookup_all_layers - allocs/op",
            "value": 17151,
            "unit": "allocs/op",
            "extra": "153 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres/toggle_bottom_edge",
            "value": 2643488,
            "unit": "ns/op\t    8395 B/op\t     149 allocs/op",
            "extra": "456 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres/toggle_bottom_edge - ns/op",
            "value": 2643488,
            "unit": "ns/op",
            "extra": "456 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres/toggle_bottom_edge - B/op",
            "value": 8395,
            "unit": "B/op",
            "extra": "456 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres/toggle_bottom_edge - allocs/op",
            "value": 149,
            "unit": "allocs/op",
            "extra": "456 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+closure/check_top",
            "value": 833289,
            "unit": "ns/op\t    4048 B/op\t      53 allocs/op",
            "extra": "1420 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+closure/check_top - ns/op",
            "value": 833289,
            "unit": "ns/op",
            "extra": "1420 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+closure/check_top - B/op",
            "value": 4048,
            "unit": "B/op",
            "extra": "1420 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+closure/check_top - allocs/op",
            "value": 53,
            "unit": "allocs/op",
            "extra": "1420 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+closure/lookup_all_layers",
            "value": 6737857,
            "unit": "ns/op\t   14169 B/op\t     229 allocs/op",
            "extra": "178 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+closure/lookup_all_layers - ns/op",
            "value": 6737857,
            "unit": "ns/op",
            "extra": "178 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+closure/lookup_all_layers - B/op",
            "value": 14169,
            "unit": "B/op",
            "extra": "178 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+closure/lookup_all_layers - allocs/op",
            "value": 229,
            "unit": "allocs/op",
            "extra": "178 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+closure/toggle_bottom_edge",
            "value": 8036075,
            "unit": "ns/op\t   41587 B/op\t     631 allocs/op",
            "extra": "147 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+closure/toggle_bottom_edge - ns/op",
            "value": 8036075,
            "unit": "ns/op",
            "extra": "147 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+closure/toggle_bottom_edge - B/op",
            "value": 41587,
            "unit": "B/op",
            "extra": "147 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+closure/toggle_bottom_edge - allocs/op",
            "value": 631,
            "unit": "allocs/op",
            "extra": "147 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+sets/check_top",
            "value": 634594,
            "unit": "ns/op\t    1331 B/op\t      30 allocs/op",
            "extra": "1827 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+sets/check_top - ns/op",
            "value": 634594,
            "unit": "ns/op",
            "extra": "1827 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+sets/check_top - B/op",
            "value": 1331,
            "unit": "B/op",
            "extra": "1827 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+sets/check_top - allocs/op",
            "value": 30,
            "unit": "allocs/op",
            "extra": "1827 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+sets/lookup_all_layers",
            "value": 6703832,
            "unit": "ns/op\t   14172 B/op\t     229 allocs/op",
            "extra": "177 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+sets/lookup_all_layers - ns/op",
            "value": 6703832,
            "unit": "ns/op",
            "extra": "177 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+sets/lookup_all_layers - B/op",
            "value": 14172,
            "unit": "B/op",
            "extra": "177 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+sets/lookup_all_layers - allocs/op",
            "value": 229,
            "unit": "allocs/op",
            "extra": "177 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+sets/toggle_bottom_edge",
            "value": 8831930,
            "unit": "ns/op\t   45127 B/op\t     951 allocs/op",
            "extra": "132 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+sets/toggle_bottom_edge - ns/op",
            "value": 8831930,
            "unit": "ns/op",
            "extra": "132 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+sets/toggle_bottom_edge - B/op",
            "value": 45127,
            "unit": "B/op",
            "extra": "132 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/dag/postgres+sets/toggle_bottom_edge - allocs/op",
            "value": 951,
            "unit": "allocs/op",
            "extra": "132 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/memory/check_leaf",
            "value": 90997,
            "unit": "ns/op\t   25726 B/op\t     263 allocs/op",
            "extra": "13100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/memory/check_leaf - ns/op",
            "value": 90997,
            "unit": "ns/op",
            "extra": "13100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/memory/check_leaf - B/op",
            "value": 25726,
            "unit": "B/op",
            "extra": "13100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/memory/check_leaf - allocs/op",
            "value": 263,
            "unit": "allocs/op",
            "extra": "13100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/memory/check_miss",
            "value": 91221,
            "unit": "ns/op\t   25809 B/op\t     265 allocs/op",
            "extra": "13022 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/memory/check_miss - ns/op",
            "value": 91221,
            "unit": "ns/op",
            "extra": "13022 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/memory/check_miss - B/op",
            "value": 25809,
            "unit": "B/op",
            "extra": "13022 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/memory/check_miss - allocs/op",
            "value": 265,
            "unit": "allocs/op",
            "extra": "13022 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/memory/lookup_all_folders",
            "value": 644650,
            "unit": "ns/op\t  235890 B/op\t     885 allocs/op",
            "extra": "1828 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/memory/lookup_all_folders - ns/op",
            "value": 644650,
            "unit": "ns/op",
            "extra": "1828 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/memory/lookup_all_folders - B/op",
            "value": 235890,
            "unit": "B/op",
            "extra": "1828 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/memory/lookup_all_folders - allocs/op",
            "value": 885,
            "unit": "allocs/op",
            "extra": "1828 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/memory/subjects_leaf",
            "value": 115590,
            "unit": "ns/op\t   55388 B/op\t     567 allocs/op",
            "extra": "9637 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/memory/subjects_leaf - ns/op",
            "value": 115590,
            "unit": "ns/op",
            "extra": "9637 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/memory/subjects_leaf - B/op",
            "value": 55388,
            "unit": "B/op",
            "extra": "9637 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/memory/subjects_leaf - allocs/op",
            "value": 567,
            "unit": "allocs/op",
            "extra": "9637 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres/check_leaf",
            "value": 15625982,
            "unit": "ns/op\t  102709 B/op\t    1570 allocs/op",
            "extra": "73 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres/check_leaf - ns/op",
            "value": 15625982,
            "unit": "ns/op",
            "extra": "73 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres/check_leaf - B/op",
            "value": 102709,
            "unit": "B/op",
            "extra": "73 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres/check_leaf - allocs/op",
            "value": 1570,
            "unit": "allocs/op",
            "extra": "73 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres/check_miss",
            "value": 15979485,
            "unit": "ns/op\t  103554 B/op\t    1590 allocs/op",
            "extra": "66 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres/check_miss - ns/op",
            "value": 15979485,
            "unit": "ns/op",
            "extra": "66 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres/check_miss - B/op",
            "value": 103554,
            "unit": "B/op",
            "extra": "66 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres/check_miss - allocs/op",
            "value": 1590,
            "unit": "allocs/op",
            "extra": "66 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres/lookup_all_folders",
            "value": 17874680,
            "unit": "ns/op\t  443256 B/op\t    6107 allocs/op",
            "extra": "62 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres/lookup_all_folders - ns/op",
            "value": 17874680,
            "unit": "ns/op",
            "extra": "62 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres/lookup_all_folders - B/op",
            "value": 443256,
            "unit": "B/op",
            "extra": "62 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres/lookup_all_folders - allocs/op",
            "value": 6107,
            "unit": "allocs/op",
            "extra": "62 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres/subjects_leaf",
            "value": 15985942,
            "unit": "ns/op\t  132830 B/op\t    1892 allocs/op",
            "extra": "70 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres/subjects_leaf - ns/op",
            "value": 15985942,
            "unit": "ns/op",
            "extra": "70 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres/subjects_leaf - B/op",
            "value": 132830,
            "unit": "B/op",
            "extra": "70 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres/subjects_leaf - allocs/op",
            "value": 1892,
            "unit": "allocs/op",
            "extra": "70 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+closure/check_leaf",
            "value": 22076806,
            "unit": "ns/op\t  147043 B/op\t    1868 allocs/op",
            "extra": "55 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+closure/check_leaf - ns/op",
            "value": 22076806,
            "unit": "ns/op",
            "extra": "55 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+closure/check_leaf - B/op",
            "value": 147043,
            "unit": "B/op",
            "extra": "55 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+closure/check_leaf - allocs/op",
            "value": 1868,
            "unit": "allocs/op",
            "extra": "55 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+closure/check_miss",
            "value": 22238044,
            "unit": "ns/op\t  149330 B/op\t    1878 allocs/op",
            "extra": "51 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+closure/check_miss - ns/op",
            "value": 22238044,
            "unit": "ns/op",
            "extra": "51 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+closure/check_miss - B/op",
            "value": 149330,
            "unit": "B/op",
            "extra": "51 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+closure/check_miss - allocs/op",
            "value": 1878,
            "unit": "allocs/op",
            "extra": "51 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+closure/lookup_all_folders",
            "value": 22844194,
            "unit": "ns/op\t  396467 B/op\t    5611 allocs/op",
            "extra": "50 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+closure/lookup_all_folders - ns/op",
            "value": 22844194,
            "unit": "ns/op",
            "extra": "50 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+closure/lookup_all_folders - B/op",
            "value": 396467,
            "unit": "B/op",
            "extra": "50 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+closure/lookup_all_folders - allocs/op",
            "value": 5611,
            "unit": "allocs/op",
            "extra": "50 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+closure/subjects_leaf",
            "value": 21549351,
            "unit": "ns/op\t  138475 B/op\t    1830 allocs/op",
            "extra": "49 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+closure/subjects_leaf - ns/op",
            "value": 21549351,
            "unit": "ns/op",
            "extra": "49 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+closure/subjects_leaf - B/op",
            "value": 138475,
            "unit": "B/op",
            "extra": "49 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+closure/subjects_leaf - allocs/op",
            "value": 1830,
            "unit": "allocs/op",
            "extra": "49 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+sets/check_leaf",
            "value": 619516,
            "unit": "ns/op\t    1361 B/op\t      29 allocs/op",
            "extra": "1922 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+sets/check_leaf - ns/op",
            "value": 619516,
            "unit": "ns/op",
            "extra": "1922 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+sets/check_leaf - B/op",
            "value": 1361,
            "unit": "B/op",
            "extra": "1922 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+sets/check_leaf - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "1922 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+sets/check_miss",
            "value": 614198,
            "unit": "ns/op\t    1321 B/op\t      29 allocs/op",
            "extra": "2000 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+sets/check_miss - ns/op",
            "value": 614198,
            "unit": "ns/op",
            "extra": "2000 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+sets/check_miss - B/op",
            "value": 1321,
            "unit": "B/op",
            "extra": "2000 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+sets/check_miss - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "2000 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+sets/lookup_all_folders",
            "value": 977853,
            "unit": "ns/op\t    7489 B/op\t     132 allocs/op",
            "extra": "1244 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+sets/lookup_all_folders - ns/op",
            "value": 977853,
            "unit": "ns/op",
            "extra": "1244 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+sets/lookup_all_folders - B/op",
            "value": 7489,
            "unit": "B/op",
            "extra": "1244 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+sets/lookup_all_folders - allocs/op",
            "value": 132,
            "unit": "allocs/op",
            "extra": "1244 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+sets/subjects_leaf",
            "value": 676443,
            "unit": "ns/op\t    2026 B/op\t      37 allocs/op",
            "extra": "1810 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+sets/subjects_leaf - ns/op",
            "value": 676443,
            "unit": "ns/op",
            "extra": "1810 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+sets/subjects_leaf - B/op",
            "value": 2026,
            "unit": "B/op",
            "extra": "1810 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/arrow_chain/postgres+sets/subjects_leaf - allocs/op",
            "value": 37,
            "unit": "allocs/op",
            "extra": "1810 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/memory/check_unbanned",
            "value": 11882027,
            "unit": "ns/op\t 1769125 B/op\t      36 allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/memory/check_unbanned - ns/op",
            "value": 11882027,
            "unit": "ns/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/memory/check_unbanned - B/op",
            "value": 1769125,
            "unit": "B/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/memory/check_unbanned - allocs/op",
            "value": 36,
            "unit": "allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/memory/check_banned",
            "value": 11954244,
            "unit": "ns/op\t 1769128 B/op\t      36 allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/memory/check_banned - ns/op",
            "value": 11954244,
            "unit": "ns/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/memory/check_banned - B/op",
            "value": 1769128,
            "unit": "B/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/memory/check_banned - allocs/op",
            "value": 36,
            "unit": "allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/memory/subjects_wildcard_minus",
            "value": 13798414,
            "unit": "ns/op\t 2730100 B/op\t     143 allocs/op",
            "extra": "90 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/memory/subjects_wildcard_minus - ns/op",
            "value": 13798414,
            "unit": "ns/op",
            "extra": "90 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/memory/subjects_wildcard_minus - B/op",
            "value": 2730100,
            "unit": "B/op",
            "extra": "90 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/memory/subjects_wildcard_minus - allocs/op",
            "value": 143,
            "unit": "allocs/op",
            "extra": "90 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/memory/lookup_banned",
            "value": 371099,
            "unit": "ns/op\t    1611 B/op\t      26 allocs/op",
            "extra": "3294 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/memory/lookup_banned - ns/op",
            "value": 371099,
            "unit": "ns/op",
            "extra": "3294 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/memory/lookup_banned - B/op",
            "value": 1611,
            "unit": "B/op",
            "extra": "3294 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/memory/lookup_banned - allocs/op",
            "value": 26,
            "unit": "allocs/op",
            "extra": "3294 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/memory/lookup_unbanned",
            "value": 363389,
            "unit": "ns/op\t    1518 B/op\t      25 allocs/op",
            "extra": "3276 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/memory/lookup_unbanned - ns/op",
            "value": 363389,
            "unit": "ns/op",
            "extra": "3276 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/memory/lookup_unbanned - B/op",
            "value": 1518,
            "unit": "B/op",
            "extra": "3276 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/memory/lookup_unbanned - allocs/op",
            "value": 25,
            "unit": "allocs/op",
            "extra": "3276 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres/check_unbanned",
            "value": 6059694,
            "unit": "ns/op\t 2859509 B/op\t   30087 allocs/op",
            "extra": "196 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres/check_unbanned - ns/op",
            "value": 6059694,
            "unit": "ns/op",
            "extra": "196 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres/check_unbanned - B/op",
            "value": 2859509,
            "unit": "B/op",
            "extra": "196 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres/check_unbanned - allocs/op",
            "value": 30087,
            "unit": "allocs/op",
            "extra": "196 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres/check_banned",
            "value": 6309663,
            "unit": "ns/op\t 2861285 B/op\t   30087 allocs/op",
            "extra": "199 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres/check_banned - ns/op",
            "value": 6309663,
            "unit": "ns/op",
            "extra": "199 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres/check_banned - B/op",
            "value": 2861285,
            "unit": "B/op",
            "extra": "199 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres/check_banned - allocs/op",
            "value": 30087,
            "unit": "allocs/op",
            "extra": "199 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres/subjects_wildcard_minus",
            "value": 8175066,
            "unit": "ns/op\t 3819066 B/op\t   30194 allocs/op",
            "extra": "144 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres/subjects_wildcard_minus - ns/op",
            "value": 8175066,
            "unit": "ns/op",
            "extra": "144 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres/subjects_wildcard_minus - B/op",
            "value": 3819066,
            "unit": "B/op",
            "extra": "144 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres/subjects_wildcard_minus - allocs/op",
            "value": 30194,
            "unit": "allocs/op",
            "extra": "144 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres/lookup_banned",
            "value": 3269380,
            "unit": "ns/op\t    7322 B/op\t     113 allocs/op",
            "extra": "368 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres/lookup_banned - ns/op",
            "value": 3269380,
            "unit": "ns/op",
            "extra": "368 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres/lookup_banned - B/op",
            "value": 7322,
            "unit": "B/op",
            "extra": "368 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres/lookup_banned - allocs/op",
            "value": 113,
            "unit": "allocs/op",
            "extra": "368 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres/lookup_unbanned",
            "value": 3330867,
            "unit": "ns/op\t    6835 B/op\t     105 allocs/op",
            "extra": "366 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres/lookup_unbanned - ns/op",
            "value": 3330867,
            "unit": "ns/op",
            "extra": "366 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres/lookup_unbanned - B/op",
            "value": 6835,
            "unit": "B/op",
            "extra": "366 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres/lookup_unbanned - allocs/op",
            "value": 105,
            "unit": "allocs/op",
            "extra": "366 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+closure/check_unbanned",
            "value": 3466943,
            "unit": "ns/op\t    6778 B/op\t      82 allocs/op",
            "extra": "345 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+closure/check_unbanned - ns/op",
            "value": 3466943,
            "unit": "ns/op",
            "extra": "345 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+closure/check_unbanned - B/op",
            "value": 6778,
            "unit": "B/op",
            "extra": "345 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+closure/check_unbanned - allocs/op",
            "value": 82,
            "unit": "allocs/op",
            "extra": "345 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+closure/check_banned",
            "value": 3478619,
            "unit": "ns/op\t    7504 B/op\t      91 allocs/op",
            "extra": "346 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+closure/check_banned - ns/op",
            "value": 3478619,
            "unit": "ns/op",
            "extra": "346 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+closure/check_banned - B/op",
            "value": 7504,
            "unit": "B/op",
            "extra": "346 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+closure/check_banned - allocs/op",
            "value": 91,
            "unit": "allocs/op",
            "extra": "346 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+closure/subjects_wildcard_minus",
            "value": 11893040,
            "unit": "ns/op\t 3816643 B/op\t   30189 allocs/op",
            "extra": "97 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+closure/subjects_wildcard_minus - ns/op",
            "value": 11893040,
            "unit": "ns/op",
            "extra": "97 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+closure/subjects_wildcard_minus - B/op",
            "value": 3816643,
            "unit": "B/op",
            "extra": "97 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+closure/subjects_wildcard_minus - allocs/op",
            "value": 30189,
            "unit": "allocs/op",
            "extra": "97 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+closure/lookup_banned",
            "value": 3222468,
            "unit": "ns/op\t    2733 B/op\t      57 allocs/op",
            "extra": "374 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+closure/lookup_banned - ns/op",
            "value": 3222468,
            "unit": "ns/op",
            "extra": "374 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+closure/lookup_banned - B/op",
            "value": 2733,
            "unit": "B/op",
            "extra": "374 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+closure/lookup_banned - allocs/op",
            "value": 57,
            "unit": "allocs/op",
            "extra": "374 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+closure/lookup_unbanned",
            "value": 1190261,
            "unit": "ns/op\t    2667 B/op\t      53 allocs/op",
            "extra": "1003 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+closure/lookup_unbanned - ns/op",
            "value": 1190261,
            "unit": "ns/op",
            "extra": "1003 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+closure/lookup_unbanned - B/op",
            "value": 2667,
            "unit": "B/op",
            "extra": "1003 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+closure/lookup_unbanned - allocs/op",
            "value": 53,
            "unit": "allocs/op",
            "extra": "1003 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+sets/check_unbanned",
            "value": 1309893,
            "unit": "ns/op\t    6828 B/op\t      82 allocs/op",
            "extra": "830 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+sets/check_unbanned - ns/op",
            "value": 1309893,
            "unit": "ns/op",
            "extra": "830 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+sets/check_unbanned - B/op",
            "value": 6828,
            "unit": "B/op",
            "extra": "830 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+sets/check_unbanned - allocs/op",
            "value": 82,
            "unit": "allocs/op",
            "extra": "830 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+sets/check_banned",
            "value": 1297790,
            "unit": "ns/op\t    7449 B/op\t      91 allocs/op",
            "extra": "910 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+sets/check_banned - ns/op",
            "value": 1297790,
            "unit": "ns/op",
            "extra": "910 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+sets/check_banned - B/op",
            "value": 7449,
            "unit": "B/op",
            "extra": "910 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+sets/check_banned - allocs/op",
            "value": 91,
            "unit": "allocs/op",
            "extra": "910 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+sets/subjects_wildcard_minus",
            "value": 27064126,
            "unit": "ns/op\t 3812533 B/op\t   30189 allocs/op",
            "extra": "42 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+sets/subjects_wildcard_minus - ns/op",
            "value": 27064126,
            "unit": "ns/op",
            "extra": "42 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+sets/subjects_wildcard_minus - B/op",
            "value": 3812533,
            "unit": "B/op",
            "extra": "42 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+sets/subjects_wildcard_minus - allocs/op",
            "value": 30189,
            "unit": "allocs/op",
            "extra": "42 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+sets/lookup_banned",
            "value": 1205928,
            "unit": "ns/op\t    2806 B/op\t      57 allocs/op",
            "extra": "987 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+sets/lookup_banned - ns/op",
            "value": 1205928,
            "unit": "ns/op",
            "extra": "987 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+sets/lookup_banned - B/op",
            "value": 2806,
            "unit": "B/op",
            "extra": "987 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+sets/lookup_banned - allocs/op",
            "value": 57,
            "unit": "allocs/op",
            "extra": "987 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+sets/lookup_unbanned",
            "value": 1221291,
            "unit": "ns/op\t    2743 B/op\t      53 allocs/op",
            "extra": "982 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+sets/lookup_unbanned - ns/op",
            "value": 1221291,
            "unit": "ns/op",
            "extra": "982 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+sets/lookup_unbanned - B/op",
            "value": 2743,
            "unit": "B/op",
            "extra": "982 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/wildcard_ban/postgres+sets/lookup_unbanned - allocs/op",
            "value": 53,
            "unit": "allocs/op",
            "extra": "982 times\n4 procs"
          }
        ]
      }
    ]
  }
}