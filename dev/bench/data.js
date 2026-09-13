window.BENCHMARK_DATA = {
  "lastUpdate": 1789319181946,
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
      }
    ]
  }
}