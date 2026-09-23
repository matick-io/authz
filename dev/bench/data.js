window.BENCHMARK_DATA = {
  "lastUpdate": 1790172222548,
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
      },
      {
        "commit": {
          "author": {
            "email": "36606323+stormsc1@users.noreply.github.com",
            "name": "Storm Søndergaard",
            "username": "stormsc1"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "36f551dfea5db5ddf65b24d2e67bf81883963c10",
          "message": "Merge pull request #1 from matick-io/bench/spicedb-comparison\n\nBench/spicedb comparison",
          "timestamp": "2026-09-23T14:25:43+02:00",
          "tree_id": "b978848254ac542f60793ef48ee2efa729e2187e",
          "url": "https://github.com/matick-io/authz/commit/36f551dfea5db5ddf65b24d2e67bf81883963c10"
        },
        "date": 1790172220524,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory/check_hit",
            "value": 2527202,
            "unit": "ns/op\t  607080 B/op\t      32 allocs/op",
            "extra": "140 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory/check_hit - ns/op",
            "value": 2527202,
            "unit": "ns/op",
            "extra": "140 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory/check_hit - B/op",
            "value": 607080,
            "unit": "B/op",
            "extra": "140 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory/check_hit - allocs/op",
            "value": 32,
            "unit": "allocs/op",
            "extra": "140 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory/check_miss",
            "value": 2601121,
            "unit": "ns/op\t  607437 B/op\t      35 allocs/op",
            "extra": "139 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory/check_miss - ns/op",
            "value": 2601121,
            "unit": "ns/op",
            "extra": "139 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory/check_miss - B/op",
            "value": 607437,
            "unit": "B/op",
            "extra": "139 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory/check_miss - allocs/op",
            "value": 35,
            "unit": "allocs/op",
            "extra": "139 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory/lookup_one_member",
            "value": 749246,
            "unit": "ns/op\t    7066 B/op\t     130 allocs/op",
            "extra": "448 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory/lookup_one_member - ns/op",
            "value": 749246,
            "unit": "ns/op",
            "extra": "448 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory/lookup_one_member - B/op",
            "value": 7066,
            "unit": "B/op",
            "extra": "448 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory/lookup_one_member - allocs/op",
            "value": 130,
            "unit": "allocs/op",
            "extra": "448 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory/subjects_all",
            "value": 3407160,
            "unit": "ns/op\t 1295787 B/op\t     139 allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory/subjects_all - ns/op",
            "value": 3407160,
            "unit": "ns/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory/subjects_all - B/op",
            "value": 1295787,
            "unit": "B/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory/subjects_all - allocs/op",
            "value": 139,
            "unit": "allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory/bulk_200",
            "value": 5311687,
            "unit": "ns/op\t 2201805 B/op\t    9279 allocs/op",
            "extra": "68 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory/bulk_200 - ns/op",
            "value": 5311687,
            "unit": "ns/op",
            "extra": "68 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory/bulk_200 - B/op",
            "value": 2201805,
            "unit": "B/op",
            "extra": "68 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory/bulk_200 - allocs/op",
            "value": 9279,
            "unit": "allocs/op",
            "extra": "68 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory/toggle_grant",
            "value": 324066,
            "unit": "ns/op\t  984680 B/op\t      29 allocs/op",
            "extra": "1162 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory/toggle_grant - ns/op",
            "value": 324066,
            "unit": "ns/op",
            "extra": "1162 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory/toggle_grant - B/op",
            "value": 984680,
            "unit": "B/op",
            "extra": "1162 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory/toggle_grant - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "1162 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory+index/check_hit",
            "value": 1776,
            "unit": "ns/op\t    1017 B/op\t      11 allocs/op",
            "extra": "234357 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory+index/check_hit - ns/op",
            "value": 1776,
            "unit": "ns/op",
            "extra": "234357 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory+index/check_hit - B/op",
            "value": 1017,
            "unit": "B/op",
            "extra": "234357 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory+index/check_hit - allocs/op",
            "value": 11,
            "unit": "allocs/op",
            "extra": "234357 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory+index/check_miss",
            "value": 7023,
            "unit": "ns/op\t    1025 B/op\t      11 allocs/op",
            "extra": "47716 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory+index/check_miss - ns/op",
            "value": 7023,
            "unit": "ns/op",
            "extra": "47716 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory+index/check_miss - B/op",
            "value": 1025,
            "unit": "B/op",
            "extra": "47716 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory+index/check_miss - allocs/op",
            "value": 11,
            "unit": "allocs/op",
            "extra": "47716 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory+index/lookup_one_member",
            "value": 2006,
            "unit": "ns/op\t    1400 B/op\t      13 allocs/op",
            "extra": "152678 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory+index/lookup_one_member - ns/op",
            "value": 2006,
            "unit": "ns/op",
            "extra": "152678 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory+index/lookup_one_member - B/op",
            "value": 1400,
            "unit": "B/op",
            "extra": "152678 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory+index/lookup_one_member - allocs/op",
            "value": 13,
            "unit": "allocs/op",
            "extra": "152678 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory+index/subjects_all",
            "value": 696699,
            "unit": "ns/op\t  503529 B/op\t      77 allocs/op",
            "extra": "560 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory+index/subjects_all - ns/op",
            "value": 696699,
            "unit": "ns/op",
            "extra": "560 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory+index/subjects_all - B/op",
            "value": 503529,
            "unit": "B/op",
            "extra": "560 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory+index/subjects_all - allocs/op",
            "value": 77,
            "unit": "allocs/op",
            "extra": "560 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory+index/bulk_200",
            "value": 444826,
            "unit": "ns/op\t  283997 B/op\t    1937 allocs/op",
            "extra": "846 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory+index/bulk_200 - ns/op",
            "value": 444826,
            "unit": "ns/op",
            "extra": "846 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory+index/bulk_200 - B/op",
            "value": 283997,
            "unit": "B/op",
            "extra": "846 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory+index/bulk_200 - allocs/op",
            "value": 1937,
            "unit": "allocs/op",
            "extra": "846 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory+index/toggle_grant",
            "value": 314578,
            "unit": "ns/op\t  984685 B/op\t      29 allocs/op",
            "extra": "1749 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory+index/toggle_grant - ns/op",
            "value": 314578,
            "unit": "ns/op",
            "extra": "1749 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory+index/toggle_grant - B/op",
            "value": 984685,
            "unit": "B/op",
            "extra": "1749 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=memory+index/toggle_grant - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "1749 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres/check_hit",
            "value": 4503796,
            "unit": "ns/op\t 1050525 B/op\t   14080 allocs/op",
            "extra": "68 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres/check_hit - ns/op",
            "value": 4503796,
            "unit": "ns/op",
            "extra": "68 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres/check_hit - B/op",
            "value": 1050525,
            "unit": "B/op",
            "extra": "68 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres/check_hit - allocs/op",
            "value": 14080,
            "unit": "allocs/op",
            "extra": "68 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres/check_miss",
            "value": 4715003,
            "unit": "ns/op\t 1051026 B/op\t   14101 allocs/op",
            "extra": "73 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres/check_miss - ns/op",
            "value": 4715003,
            "unit": "ns/op",
            "extra": "73 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres/check_miss - B/op",
            "value": 1051026,
            "unit": "B/op",
            "extra": "73 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres/check_miss - allocs/op",
            "value": 14101,
            "unit": "allocs/op",
            "extra": "73 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres/lookup_one_member",
            "value": 3651089,
            "unit": "ns/op\t   46608 B/op\t     745 allocs/op",
            "extra": "99 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres/lookup_one_member - ns/op",
            "value": 3651089,
            "unit": "ns/op",
            "extra": "99 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres/lookup_one_member - B/op",
            "value": 46608,
            "unit": "B/op",
            "extra": "99 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres/lookup_one_member - allocs/op",
            "value": 745,
            "unit": "allocs/op",
            "extra": "99 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres/subjects_all",
            "value": 5650683,
            "unit": "ns/op\t 1739367 B/op\t   14205 allocs/op",
            "extra": "62 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres/subjects_all - ns/op",
            "value": 5650683,
            "unit": "ns/op",
            "extra": "62 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres/subjects_all - B/op",
            "value": 1739367,
            "unit": "B/op",
            "extra": "62 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres/subjects_all - allocs/op",
            "value": 14205,
            "unit": "allocs/op",
            "extra": "62 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres/bulk_200",
            "value": 7574526,
            "unit": "ns/op\t 2645583 B/op\t   23345 allocs/op",
            "extra": "50 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres/bulk_200 - ns/op",
            "value": 7574526,
            "unit": "ns/op",
            "extra": "50 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres/bulk_200 - B/op",
            "value": 2645583,
            "unit": "B/op",
            "extra": "50 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres/bulk_200 - allocs/op",
            "value": 23345,
            "unit": "allocs/op",
            "extra": "50 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres/toggle_grant",
            "value": 8312523,
            "unit": "ns/op\t   12368 B/op\t     143 allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres/toggle_grant - ns/op",
            "value": 8312523,
            "unit": "ns/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres/toggle_grant - B/op",
            "value": 12368,
            "unit": "B/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres/toggle_grant - allocs/op",
            "value": 143,
            "unit": "allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+closure/check_hit",
            "value": 605260,
            "unit": "ns/op\t    5900 B/op\t      96 allocs/op",
            "extra": "607 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+closure/check_hit - ns/op",
            "value": 605260,
            "unit": "ns/op",
            "extra": "607 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+closure/check_hit - B/op",
            "value": 5900,
            "unit": "B/op",
            "extra": "607 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+closure/check_hit - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "607 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+closure/check_miss",
            "value": 1007622,
            "unit": "ns/op\t   10166 B/op\t     162 allocs/op",
            "extra": "364 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+closure/check_miss - ns/op",
            "value": 1007622,
            "unit": "ns/op",
            "extra": "364 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+closure/check_miss - B/op",
            "value": 10166,
            "unit": "B/op",
            "extra": "364 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+closure/check_miss - allocs/op",
            "value": 162,
            "unit": "allocs/op",
            "extra": "364 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+closure/lookup_one_member",
            "value": 904878,
            "unit": "ns/op\t    4859 B/op\t     109 allocs/op",
            "extra": "430 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+closure/lookup_one_member - ns/op",
            "value": 904878,
            "unit": "ns/op",
            "extra": "430 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+closure/lookup_one_member - B/op",
            "value": 4859,
            "unit": "B/op",
            "extra": "430 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+closure/lookup_one_member - allocs/op",
            "value": 109,
            "unit": "allocs/op",
            "extra": "430 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+closure/subjects_all",
            "value": 7023402,
            "unit": "ns/op\t 1522935 B/op\t   14203 allocs/op",
            "extra": "49 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+closure/subjects_all - ns/op",
            "value": 7023402,
            "unit": "ns/op",
            "extra": "49 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+closure/subjects_all - B/op",
            "value": 1522935,
            "unit": "B/op",
            "extra": "49 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+closure/subjects_all - allocs/op",
            "value": 14203,
            "unit": "allocs/op",
            "extra": "49 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+closure/bulk_200",
            "value": 90089872,
            "unit": "ns/op\t 1079760 B/op\t   20760 allocs/op",
            "extra": "4 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+closure/bulk_200 - ns/op",
            "value": 90089872,
            "unit": "ns/op",
            "extra": "4 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+closure/bulk_200 - B/op",
            "value": 1079760,
            "unit": "B/op",
            "extra": "4 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+closure/bulk_200 - allocs/op",
            "value": 20760,
            "unit": "allocs/op",
            "extra": "4 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+closure/toggle_grant",
            "value": 3903707,
            "unit": "ns/op\t   12177 B/op\t     144 allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+closure/toggle_grant - ns/op",
            "value": 3903707,
            "unit": "ns/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+closure/toggle_grant - B/op",
            "value": 12177,
            "unit": "B/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+closure/toggle_grant - allocs/op",
            "value": 144,
            "unit": "allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+sets/check_hit",
            "value": 748944,
            "unit": "ns/op\t    6161 B/op\t      76 allocs/op",
            "extra": "526 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+sets/check_hit - ns/op",
            "value": 748944,
            "unit": "ns/op",
            "extra": "526 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+sets/check_hit - B/op",
            "value": 6161,
            "unit": "B/op",
            "extra": "526 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+sets/check_hit - allocs/op",
            "value": 76,
            "unit": "allocs/op",
            "extra": "526 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+sets/check_miss",
            "value": 752128,
            "unit": "ns/op\t    5850 B/op\t      76 allocs/op",
            "extra": "470 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+sets/check_miss - ns/op",
            "value": 752128,
            "unit": "ns/op",
            "extra": "470 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+sets/check_miss - B/op",
            "value": 5850,
            "unit": "B/op",
            "extra": "470 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+sets/check_miss - allocs/op",
            "value": 76,
            "unit": "allocs/op",
            "extra": "470 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+sets/lookup_one_member",
            "value": 672487,
            "unit": "ns/op\t    3357 B/op\t      72 allocs/op",
            "extra": "514 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+sets/lookup_one_member - ns/op",
            "value": 672487,
            "unit": "ns/op",
            "extra": "514 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+sets/lookup_one_member - B/op",
            "value": 3357,
            "unit": "B/op",
            "extra": "514 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+sets/lookup_one_member - allocs/op",
            "value": 72,
            "unit": "allocs/op",
            "extra": "514 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+sets/subjects_all",
            "value": 3236569,
            "unit": "ns/op\t  429824 B/op\t    6111 allocs/op",
            "extra": "96 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+sets/subjects_all - ns/op",
            "value": 3236569,
            "unit": "ns/op",
            "extra": "96 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+sets/subjects_all - B/op",
            "value": 429824,
            "unit": "B/op",
            "extra": "96 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+sets/subjects_all - allocs/op",
            "value": 6111,
            "unit": "allocs/op",
            "extra": "96 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+sets/bulk_200",
            "value": 100661986,
            "unit": "ns/op\t 1280378 B/op\t   14846 allocs/op",
            "extra": "3 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+sets/bulk_200 - ns/op",
            "value": 100661986,
            "unit": "ns/op",
            "extra": "3 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+sets/bulk_200 - B/op",
            "value": 1280378,
            "unit": "B/op",
            "extra": "3 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+sets/bulk_200 - allocs/op",
            "value": 14846,
            "unit": "allocs/op",
            "extra": "3 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+sets/toggle_grant",
            "value": 16766246,
            "unit": "ns/op\t   22002 B/op\t     212 allocs/op",
            "extra": "21 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+sets/toggle_grant - ns/op",
            "value": 16766246,
            "unit": "ns/op",
            "extra": "21 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+sets/toggle_grant - B/op",
            "value": 22002,
            "unit": "B/op",
            "extra": "21 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=postgres+sets/toggle_grant - allocs/op",
            "value": 212,
            "unit": "allocs/op",
            "extra": "21 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-memdb/check_hit",
            "value": 330111,
            "unit": "ns/op\t    7337 B/op\t     108 allocs/op",
            "extra": "969 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-memdb/check_hit - ns/op",
            "value": 330111,
            "unit": "ns/op",
            "extra": "969 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-memdb/check_hit - B/op",
            "value": 7337,
            "unit": "B/op",
            "extra": "969 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-memdb/check_hit - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "969 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-memdb/check_miss",
            "value": 327877,
            "unit": "ns/op\t    7369 B/op\t     108 allocs/op",
            "extra": "988 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-memdb/check_miss - ns/op",
            "value": 327877,
            "unit": "ns/op",
            "extra": "988 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-memdb/check_miss - B/op",
            "value": 7369,
            "unit": "B/op",
            "extra": "988 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-memdb/check_miss - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "988 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-memdb/lookup_one_member",
            "value": 348615,
            "unit": "ns/op\t    7933 B/op\t     113 allocs/op",
            "extra": "961 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-memdb/lookup_one_member - ns/op",
            "value": 348615,
            "unit": "ns/op",
            "extra": "961 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-memdb/lookup_one_member - B/op",
            "value": 7933,
            "unit": "B/op",
            "extra": "961 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-memdb/lookup_one_member - allocs/op",
            "value": 113,
            "unit": "allocs/op",
            "extra": "961 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-memdb/subjects_all",
            "value": 4502959,
            "unit": "ns/op\t 1222211 B/op\t   20190 allocs/op",
            "extra": "79 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-memdb/subjects_all - ns/op",
            "value": 4502959,
            "unit": "ns/op",
            "extra": "79 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-memdb/subjects_all - B/op",
            "value": 1222211,
            "unit": "B/op",
            "extra": "79 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-memdb/subjects_all - allocs/op",
            "value": 20190,
            "unit": "allocs/op",
            "extra": "79 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-memdb/bulk_200",
            "value": 3119364,
            "unit": "ns/op\t  191397 B/op\t    3112 allocs/op",
            "extra": "111 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-memdb/bulk_200 - ns/op",
            "value": 3119364,
            "unit": "ns/op",
            "extra": "111 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-memdb/bulk_200 - B/op",
            "value": 191397,
            "unit": "B/op",
            "extra": "111 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-memdb/bulk_200 - allocs/op",
            "value": 3112,
            "unit": "allocs/op",
            "extra": "111 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-memdb/toggle_grant",
            "value": 831261,
            "unit": "ns/op\t   15172 B/op\t     225 allocs/op",
            "extra": "442 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-memdb/toggle_grant - ns/op",
            "value": 831261,
            "unit": "ns/op",
            "extra": "442 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-memdb/toggle_grant - B/op",
            "value": 15172,
            "unit": "B/op",
            "extra": "442 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-memdb/toggle_grant - allocs/op",
            "value": 225,
            "unit": "allocs/op",
            "extra": "442 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-postgres/check_hit",
            "value": 589475,
            "unit": "ns/op\t    7353 B/op\t     108 allocs/op",
            "extra": "591 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-postgres/check_hit - ns/op",
            "value": 589475,
            "unit": "ns/op",
            "extra": "591 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-postgres/check_hit - B/op",
            "value": 7353,
            "unit": "B/op",
            "extra": "591 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-postgres/check_hit - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "591 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-postgres/check_miss",
            "value": 595345,
            "unit": "ns/op\t    7355 B/op\t     108 allocs/op",
            "extra": "566 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-postgres/check_miss - ns/op",
            "value": 595345,
            "unit": "ns/op",
            "extra": "566 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-postgres/check_miss - B/op",
            "value": 7355,
            "unit": "B/op",
            "extra": "566 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-postgres/check_miss - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "566 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-postgres/lookup_one_member",
            "value": 603757,
            "unit": "ns/op\t    7905 B/op\t     113 allocs/op",
            "extra": "594 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-postgres/lookup_one_member - ns/op",
            "value": 603757,
            "unit": "ns/op",
            "extra": "594 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-postgres/lookup_one_member - B/op",
            "value": 7905,
            "unit": "B/op",
            "extra": "594 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-postgres/lookup_one_member - allocs/op",
            "value": 113,
            "unit": "allocs/op",
            "extra": "594 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-postgres/subjects_all",
            "value": 4550467,
            "unit": "ns/op\t 1129071 B/op\t   20111 allocs/op",
            "extra": "78 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-postgres/subjects_all - ns/op",
            "value": 4550467,
            "unit": "ns/op",
            "extra": "78 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-postgres/subjects_all - B/op",
            "value": 1129071,
            "unit": "B/op",
            "extra": "78 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-postgres/subjects_all - allocs/op",
            "value": 20111,
            "unit": "allocs/op",
            "extra": "78 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-postgres/bulk_200",
            "value": 3512784,
            "unit": "ns/op\t  191539 B/op\t    3112 allocs/op",
            "extra": "98 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-postgres/bulk_200 - ns/op",
            "value": 3512784,
            "unit": "ns/op",
            "extra": "98 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-postgres/bulk_200 - B/op",
            "value": 191539,
            "unit": "B/op",
            "extra": "98 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-postgres/bulk_200 - allocs/op",
            "value": 3112,
            "unit": "allocs/op",
            "extra": "98 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-postgres/toggle_grant",
            "value": 14475268,
            "unit": "ns/op\t   16448 B/op\t     226 allocs/op",
            "extra": "28 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-postgres/toggle_grant - ns/op",
            "value": 14475268,
            "unit": "ns/op",
            "extra": "28 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-postgres/toggle_grant - B/op",
            "value": 16448,
            "unit": "B/op",
            "extra": "28 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wide_team/kind=spicedb-postgres/toggle_grant - allocs/op",
            "value": 226,
            "unit": "allocs/op",
            "extra": "28 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory/check_hit",
            "value": 199699,
            "unit": "ns/op\t   38803 B/op\t     531 allocs/op",
            "extra": "1912 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory/check_hit - ns/op",
            "value": 199699,
            "unit": "ns/op",
            "extra": "1912 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory/check_hit - B/op",
            "value": 38803,
            "unit": "B/op",
            "extra": "1912 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory/check_hit - allocs/op",
            "value": 531,
            "unit": "allocs/op",
            "extra": "1912 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory/check_miss",
            "value": 195336,
            "unit": "ns/op\t   38956 B/op\t     534 allocs/op",
            "extra": "1840 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory/check_miss - ns/op",
            "value": 195336,
            "unit": "ns/op",
            "extra": "1840 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory/check_miss - B/op",
            "value": 38956,
            "unit": "B/op",
            "extra": "1840 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory/check_miss - allocs/op",
            "value": 534,
            "unit": "allocs/op",
            "extra": "1840 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory/lookup_all_teams",
            "value": 5857689,
            "unit": "ns/op\t 1934904 B/op\t    2541 allocs/op",
            "extra": "62 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory/lookup_all_teams - ns/op",
            "value": 5857689,
            "unit": "ns/op",
            "extra": "62 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory/lookup_all_teams - B/op",
            "value": 1934904,
            "unit": "B/op",
            "extra": "62 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory/lookup_all_teams - allocs/op",
            "value": 2541,
            "unit": "allocs/op",
            "extra": "62 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory/subjects_at_top",
            "value": 220371,
            "unit": "ns/op\t   84888 B/op\t    1046 allocs/op",
            "extra": "1570 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory/subjects_at_top - ns/op",
            "value": 220371,
            "unit": "ns/op",
            "extra": "1570 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory/subjects_at_top - B/op",
            "value": 84888,
            "unit": "B/op",
            "extra": "1570 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory/subjects_at_top - allocs/op",
            "value": 1046,
            "unit": "allocs/op",
            "extra": "1570 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory/toggle_top_edge",
            "value": 16332,
            "unit": "ns/op\t   34044 B/op\t      17 allocs/op",
            "extra": "20352 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory/toggle_top_edge - ns/op",
            "value": 16332,
            "unit": "ns/op",
            "extra": "20352 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory/toggle_top_edge - B/op",
            "value": 34044,
            "unit": "B/op",
            "extra": "20352 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory/toggle_top_edge - allocs/op",
            "value": 17,
            "unit": "allocs/op",
            "extra": "20352 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory/toggle_bottom_edge",
            "value": 16224,
            "unit": "ns/op\t   34039 B/op\t      17 allocs/op",
            "extra": "21864 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory/toggle_bottom_edge - ns/op",
            "value": 16224,
            "unit": "ns/op",
            "extra": "21864 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory/toggle_bottom_edge - B/op",
            "value": 34039,
            "unit": "B/op",
            "extra": "21864 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory/toggle_bottom_edge - allocs/op",
            "value": 17,
            "unit": "allocs/op",
            "extra": "21864 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory+index/check_hit",
            "value": 4848,
            "unit": "ns/op\t    5787 B/op\t      11 allocs/op",
            "extra": "87315 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory+index/check_hit - ns/op",
            "value": 4848,
            "unit": "ns/op",
            "extra": "87315 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory+index/check_hit - B/op",
            "value": 5787,
            "unit": "B/op",
            "extra": "87315 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory+index/check_hit - allocs/op",
            "value": 11,
            "unit": "allocs/op",
            "extra": "87315 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory+index/check_miss",
            "value": 4865,
            "unit": "ns/op\t    5794 B/op\t      11 allocs/op",
            "extra": "86294 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory+index/check_miss - ns/op",
            "value": 4865,
            "unit": "ns/op",
            "extra": "86294 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory+index/check_miss - B/op",
            "value": 5794,
            "unit": "B/op",
            "extra": "86294 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory+index/check_miss - allocs/op",
            "value": 11,
            "unit": "allocs/op",
            "extra": "86294 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory+index/lookup_all_teams",
            "value": 26308,
            "unit": "ns/op\t   17874 B/op\t      31 allocs/op",
            "extra": "14223 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory+index/lookup_all_teams - ns/op",
            "value": 26308,
            "unit": "ns/op",
            "extra": "14223 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory+index/lookup_all_teams - B/op",
            "value": 17874,
            "unit": "B/op",
            "extra": "14223 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory+index/lookup_all_teams - allocs/op",
            "value": 31,
            "unit": "allocs/op",
            "extra": "14223 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory+index/subjects_at_top",
            "value": 5514,
            "unit": "ns/op\t    6506 B/op\t      19 allocs/op",
            "extra": "76234 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory+index/subjects_at_top - ns/op",
            "value": 5514,
            "unit": "ns/op",
            "extra": "76234 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory+index/subjects_at_top - B/op",
            "value": 6506,
            "unit": "B/op",
            "extra": "76234 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory+index/subjects_at_top - allocs/op",
            "value": 19,
            "unit": "allocs/op",
            "extra": "76234 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory+index/toggle_top_edge",
            "value": 16124,
            "unit": "ns/op\t   34008 B/op\t      17 allocs/op",
            "extra": "22221 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory+index/toggle_top_edge - ns/op",
            "value": 16124,
            "unit": "ns/op",
            "extra": "22221 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory+index/toggle_top_edge - B/op",
            "value": 34008,
            "unit": "B/op",
            "extra": "22221 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory+index/toggle_top_edge - allocs/op",
            "value": 17,
            "unit": "allocs/op",
            "extra": "22221 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory+index/toggle_bottom_edge",
            "value": 16082,
            "unit": "ns/op\t   34050 B/op\t      17 allocs/op",
            "extra": "21037 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory+index/toggle_bottom_edge - ns/op",
            "value": 16082,
            "unit": "ns/op",
            "extra": "21037 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory+index/toggle_bottom_edge - B/op",
            "value": 34050,
            "unit": "B/op",
            "extra": "21037 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=memory+index/toggle_bottom_edge - allocs/op",
            "value": 17,
            "unit": "allocs/op",
            "extra": "21037 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres/check_hit",
            "value": 15337506,
            "unit": "ns/op\t  186866 B/op\t    3261 allocs/op",
            "extra": "24 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres/check_hit - ns/op",
            "value": 15337506,
            "unit": "ns/op",
            "extra": "24 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres/check_hit - B/op",
            "value": 186866,
            "unit": "B/op",
            "extra": "24 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres/check_hit - allocs/op",
            "value": 3261,
            "unit": "allocs/op",
            "extra": "24 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres/check_miss",
            "value": 14428559,
            "unit": "ns/op\t  190950 B/op\t    3282 allocs/op",
            "extra": "26 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres/check_miss - ns/op",
            "value": 14428559,
            "unit": "ns/op",
            "extra": "26 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres/check_miss - B/op",
            "value": 190950,
            "unit": "B/op",
            "extra": "26 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres/check_miss - allocs/op",
            "value": 3282,
            "unit": "allocs/op",
            "extra": "26 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres/lookup_all_teams",
            "value": 37778204,
            "unit": "ns/op\t 3585088 B/op\t   53495 allocs/op",
            "extra": "10 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres/lookup_all_teams - ns/op",
            "value": 37778204,
            "unit": "ns/op",
            "extra": "10 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres/lookup_all_teams - B/op",
            "value": 3585088,
            "unit": "B/op",
            "extra": "10 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres/lookup_all_teams - allocs/op",
            "value": 53495,
            "unit": "allocs/op",
            "extra": "10 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres/subjects_at_top",
            "value": 14865084,
            "unit": "ns/op\t  238308 B/op\t    3794 allocs/op",
            "extra": "26 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres/subjects_at_top - ns/op",
            "value": 14865084,
            "unit": "ns/op",
            "extra": "26 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres/subjects_at_top - B/op",
            "value": 238308,
            "unit": "B/op",
            "extra": "26 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres/subjects_at_top - allocs/op",
            "value": 3794,
            "unit": "allocs/op",
            "extra": "26 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres/toggle_top_edge",
            "value": 16353691,
            "unit": "ns/op\t   11804 B/op\t     148 allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres/toggle_top_edge - ns/op",
            "value": 16353691,
            "unit": "ns/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres/toggle_top_edge - B/op",
            "value": 11804,
            "unit": "B/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres/toggle_top_edge - allocs/op",
            "value": 148,
            "unit": "allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres/toggle_bottom_edge",
            "value": 7595458,
            "unit": "ns/op\t   12562 B/op\t     148 allocs/op",
            "extra": "54 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres/toggle_bottom_edge - ns/op",
            "value": 7595458,
            "unit": "ns/op",
            "extra": "54 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres/toggle_bottom_edge - B/op",
            "value": 12562,
            "unit": "B/op",
            "extra": "54 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres/toggle_bottom_edge - allocs/op",
            "value": 148,
            "unit": "allocs/op",
            "extra": "54 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+closure/check_hit",
            "value": 1309694,
            "unit": "ns/op\t    5934 B/op\t      96 allocs/op",
            "extra": "282 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+closure/check_hit - ns/op",
            "value": 1309694,
            "unit": "ns/op",
            "extra": "282 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+closure/check_hit - B/op",
            "value": 5934,
            "unit": "B/op",
            "extra": "282 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+closure/check_hit - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "282 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+closure/check_miss",
            "value": 1616625,
            "unit": "ns/op\t    9838 B/op\t     162 allocs/op",
            "extra": "222 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+closure/check_miss - ns/op",
            "value": 1616625,
            "unit": "ns/op",
            "extra": "222 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+closure/check_miss - B/op",
            "value": 9838,
            "unit": "B/op",
            "extra": "222 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+closure/check_miss - allocs/op",
            "value": 162,
            "unit": "allocs/op",
            "extra": "222 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+closure/lookup_all_teams",
            "value": 1616732,
            "unit": "ns/op\t   19375 B/op\t     375 allocs/op",
            "extra": "217 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+closure/lookup_all_teams - ns/op",
            "value": 1616732,
            "unit": "ns/op",
            "extra": "217 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+closure/lookup_all_teams - B/op",
            "value": 19375,
            "unit": "B/op",
            "extra": "217 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+closure/lookup_all_teams - allocs/op",
            "value": 375,
            "unit": "allocs/op",
            "extra": "217 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+closure/subjects_at_top",
            "value": 1450318,
            "unit": "ns/op\t    8581 B/op\t     140 allocs/op",
            "extra": "250 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+closure/subjects_at_top - ns/op",
            "value": 1450318,
            "unit": "ns/op",
            "extra": "250 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+closure/subjects_at_top - B/op",
            "value": 8581,
            "unit": "B/op",
            "extra": "250 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+closure/subjects_at_top - allocs/op",
            "value": 140,
            "unit": "allocs/op",
            "extra": "250 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+closure/toggle_top_edge",
            "value": 91193322,
            "unit": "ns/op\t  217444 B/op\t    2273 allocs/op",
            "extra": "8 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+closure/toggle_top_edge - ns/op",
            "value": 91193322,
            "unit": "ns/op",
            "extra": "8 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+closure/toggle_top_edge - B/op",
            "value": 217444,
            "unit": "B/op",
            "extra": "8 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+closure/toggle_top_edge - allocs/op",
            "value": 2273,
            "unit": "allocs/op",
            "extra": "8 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+closure/toggle_bottom_edge",
            "value": 19330769,
            "unit": "ns/op\t   74080 B/op\t    1101 allocs/op",
            "extra": "39 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+closure/toggle_bottom_edge - ns/op",
            "value": 19330769,
            "unit": "ns/op",
            "extra": "39 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+closure/toggle_bottom_edge - B/op",
            "value": 74080,
            "unit": "B/op",
            "extra": "39 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+closure/toggle_bottom_edge - allocs/op",
            "value": 1101,
            "unit": "allocs/op",
            "extra": "39 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+sets/check_hit",
            "value": 785793,
            "unit": "ns/op\t    6114 B/op\t      76 allocs/op",
            "extra": "468 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+sets/check_hit - ns/op",
            "value": 785793,
            "unit": "ns/op",
            "extra": "468 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+sets/check_hit - B/op",
            "value": 6114,
            "unit": "B/op",
            "extra": "468 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+sets/check_hit - allocs/op",
            "value": 76,
            "unit": "allocs/op",
            "extra": "468 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+sets/check_miss",
            "value": 767012,
            "unit": "ns/op\t    6105 B/op\t      76 allocs/op",
            "extra": "495 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+sets/check_miss - ns/op",
            "value": 767012,
            "unit": "ns/op",
            "extra": "495 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+sets/check_miss - B/op",
            "value": 6105,
            "unit": "B/op",
            "extra": "495 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+sets/check_miss - allocs/op",
            "value": 76,
            "unit": "allocs/op",
            "extra": "495 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+sets/lookup_all_teams",
            "value": 1601890,
            "unit": "ns/op\t   19373 B/op\t     375 allocs/op",
            "extra": "219 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+sets/lookup_all_teams - ns/op",
            "value": 1601890,
            "unit": "ns/op",
            "extra": "219 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+sets/lookup_all_teams - B/op",
            "value": 19373,
            "unit": "B/op",
            "extra": "219 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+sets/lookup_all_teams - allocs/op",
            "value": 375,
            "unit": "allocs/op",
            "extra": "219 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+sets/subjects_at_top",
            "value": 751202,
            "unit": "ns/op\t    3600 B/op\t      73 allocs/op",
            "extra": "524 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+sets/subjects_at_top - ns/op",
            "value": 751202,
            "unit": "ns/op",
            "extra": "524 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+sets/subjects_at_top - B/op",
            "value": 3600,
            "unit": "B/op",
            "extra": "524 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+sets/subjects_at_top - allocs/op",
            "value": 73,
            "unit": "allocs/op",
            "extra": "524 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+sets/toggle_top_edge",
            "value": 54250981,
            "unit": "ns/op\t  210114 B/op\t    2393 allocs/op",
            "extra": "7 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+sets/toggle_top_edge - ns/op",
            "value": 54250981,
            "unit": "ns/op",
            "extra": "7 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+sets/toggle_top_edge - B/op",
            "value": 210114,
            "unit": "B/op",
            "extra": "7 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+sets/toggle_top_edge - allocs/op",
            "value": 2393,
            "unit": "allocs/op",
            "extra": "7 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+sets/toggle_bottom_edge",
            "value": 13070723,
            "unit": "ns/op\t   79844 B/op\t    1158 allocs/op",
            "extra": "48 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+sets/toggle_bottom_edge - ns/op",
            "value": 13070723,
            "unit": "ns/op",
            "extra": "48 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+sets/toggle_bottom_edge - B/op",
            "value": 79844,
            "unit": "B/op",
            "extra": "48 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=postgres+sets/toggle_bottom_edge - allocs/op",
            "value": 1158,
            "unit": "allocs/op",
            "extra": "48 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=spicedb-memdb/toggle_top_edge",
            "value": 782550,
            "unit": "ns/op\t   15277 B/op\t     225 allocs/op",
            "extra": "427 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=spicedb-memdb/toggle_top_edge - ns/op",
            "value": 782550,
            "unit": "ns/op",
            "extra": "427 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=spicedb-memdb/toggle_top_edge - B/op",
            "value": 15277,
            "unit": "B/op",
            "extra": "427 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=spicedb-memdb/toggle_top_edge - allocs/op",
            "value": 225,
            "unit": "allocs/op",
            "extra": "427 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=spicedb-memdb/toggle_bottom_edge",
            "value": 795565,
            "unit": "ns/op\t   15200 B/op\t     225 allocs/op",
            "extra": "448 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=spicedb-memdb/toggle_bottom_edge - ns/op",
            "value": 795565,
            "unit": "ns/op",
            "extra": "448 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=spicedb-memdb/toggle_bottom_edge - B/op",
            "value": 15200,
            "unit": "B/op",
            "extra": "448 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=spicedb-memdb/toggle_bottom_edge - allocs/op",
            "value": 225,
            "unit": "allocs/op",
            "extra": "448 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=spicedb-postgres/toggle_top_edge",
            "value": 14230116,
            "unit": "ns/op\t   15377 B/op\t     227 allocs/op",
            "extra": "85 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=spicedb-postgres/toggle_top_edge - ns/op",
            "value": 14230116,
            "unit": "ns/op",
            "extra": "85 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=spicedb-postgres/toggle_top_edge - B/op",
            "value": 15377,
            "unit": "B/op",
            "extra": "85 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=spicedb-postgres/toggle_top_edge - allocs/op",
            "value": 227,
            "unit": "allocs/op",
            "extra": "85 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=spicedb-postgres/toggle_bottom_edge",
            "value": 12886923,
            "unit": "ns/op\t   15932 B/op\t     226 allocs/op",
            "extra": "97 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=spicedb-postgres/toggle_bottom_edge - ns/op",
            "value": 12886923,
            "unit": "ns/op",
            "extra": "97 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=spicedb-postgres/toggle_bottom_edge - B/op",
            "value": 15932,
            "unit": "B/op",
            "extra": "97 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=deep_nesting/kind=spicedb-postgres/toggle_bottom_edge - allocs/op",
            "value": 226,
            "unit": "allocs/op",
            "extra": "97 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=memory/lookup_hub",
            "value": 848708,
            "unit": "ns/op\t   86801 B/op\t     148 allocs/op",
            "extra": "426 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=memory/lookup_hub - ns/op",
            "value": 848708,
            "unit": "ns/op",
            "extra": "426 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=memory/lookup_hub - B/op",
            "value": 86801,
            "unit": "B/op",
            "extra": "426 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=memory/lookup_hub - allocs/op",
            "value": 148,
            "unit": "allocs/op",
            "extra": "426 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=memory/lookup_single_owner",
            "value": 430331,
            "unit": "ns/op\t    2711 B/op\t      50 allocs/op",
            "extra": "802 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=memory/lookup_single_owner - ns/op",
            "value": 430331,
            "unit": "ns/op",
            "extra": "802 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=memory/lookup_single_owner - B/op",
            "value": 2711,
            "unit": "B/op",
            "extra": "802 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=memory/lookup_single_owner - allocs/op",
            "value": 50,
            "unit": "allocs/op",
            "extra": "802 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=memory/check_miss",
            "value": 140214,
            "unit": "ns/op\t    1208 B/op\t      16 allocs/op",
            "extra": "2545 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=memory/check_miss - ns/op",
            "value": 140214,
            "unit": "ns/op",
            "extra": "2545 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=memory/check_miss - B/op",
            "value": 1208,
            "unit": "B/op",
            "extra": "2545 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=memory/check_miss - allocs/op",
            "value": 16,
            "unit": "allocs/op",
            "extra": "2545 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=memory+index/lookup_hub",
            "value": 19781,
            "unit": "ns/op\t   16854 B/op\t      34 allocs/op",
            "extra": "18894 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=memory+index/lookup_hub - ns/op",
            "value": 19781,
            "unit": "ns/op",
            "extra": "18894 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=memory+index/lookup_hub - B/op",
            "value": 16854,
            "unit": "B/op",
            "extra": "18894 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=memory+index/lookup_hub - allocs/op",
            "value": 34,
            "unit": "allocs/op",
            "extra": "18894 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=memory+index/lookup_single_owner",
            "value": 1870,
            "unit": "ns/op\t    1400 B/op\t      13 allocs/op",
            "extra": "208214 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=memory+index/lookup_single_owner - ns/op",
            "value": 1870,
            "unit": "ns/op",
            "extra": "208214 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=memory+index/lookup_single_owner - B/op",
            "value": 1400,
            "unit": "B/op",
            "extra": "208214 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=memory+index/lookup_single_owner - allocs/op",
            "value": 13,
            "unit": "allocs/op",
            "extra": "208214 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=memory+index/check_miss",
            "value": 1608,
            "unit": "ns/op\t     921 B/op\t      10 allocs/op",
            "extra": "228878 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=memory+index/check_miss - ns/op",
            "value": 1608,
            "unit": "ns/op",
            "extra": "228878 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=memory+index/check_miss - B/op",
            "value": 921,
            "unit": "B/op",
            "extra": "228878 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=memory+index/check_miss - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "228878 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=postgres/lookup_hub",
            "value": 1947127,
            "unit": "ns/op\t  147006 B/op\t    1779 allocs/op",
            "extra": "201 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=postgres/lookup_hub - ns/op",
            "value": 1947127,
            "unit": "ns/op",
            "extra": "201 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=postgres/lookup_hub - B/op",
            "value": 147006,
            "unit": "B/op",
            "extra": "201 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=postgres/lookup_hub - allocs/op",
            "value": 1779,
            "unit": "allocs/op",
            "extra": "201 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=postgres/lookup_single_owner",
            "value": 1060693,
            "unit": "ns/op\t   13038 B/op\t     209 allocs/op",
            "extra": "379 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=postgres/lookup_single_owner - ns/op",
            "value": 1060693,
            "unit": "ns/op",
            "extra": "379 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=postgres/lookup_single_owner - B/op",
            "value": 13038,
            "unit": "B/op",
            "extra": "379 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=postgres/lookup_single_owner - allocs/op",
            "value": 209,
            "unit": "allocs/op",
            "extra": "379 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=postgres/check_miss",
            "value": 410321,
            "unit": "ns/op\t    3950 B/op\t      65 allocs/op",
            "extra": "912 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=postgres/check_miss - ns/op",
            "value": 410321,
            "unit": "ns/op",
            "extra": "912 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=postgres/check_miss - B/op",
            "value": 3950,
            "unit": "B/op",
            "extra": "912 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=postgres/check_miss - allocs/op",
            "value": 65,
            "unit": "allocs/op",
            "extra": "912 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=postgres+closure/lookup_hub",
            "value": 846079,
            "unit": "ns/op\t   16457 B/op\t     277 allocs/op",
            "extra": "411 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=postgres+closure/lookup_hub - ns/op",
            "value": 846079,
            "unit": "ns/op",
            "extra": "411 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=postgres+closure/lookup_hub - B/op",
            "value": 16457,
            "unit": "B/op",
            "extra": "411 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=postgres+closure/lookup_hub - allocs/op",
            "value": 277,
            "unit": "allocs/op",
            "extra": "411 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=postgres+closure/lookup_single_owner",
            "value": 824440,
            "unit": "ns/op\t    4855 B/op\t     110 allocs/op",
            "extra": "508 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=postgres+closure/lookup_single_owner - ns/op",
            "value": 824440,
            "unit": "ns/op",
            "extra": "508 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=postgres+closure/lookup_single_owner - B/op",
            "value": 4855,
            "unit": "B/op",
            "extra": "508 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=postgres+closure/lookup_single_owner - allocs/op",
            "value": 110,
            "unit": "allocs/op",
            "extra": "508 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=postgres+closure/check_miss",
            "value": 938176,
            "unit": "ns/op\t    9785 B/op\t     162 allocs/op",
            "extra": "388 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=postgres+closure/check_miss - ns/op",
            "value": 938176,
            "unit": "ns/op",
            "extra": "388 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=postgres+closure/check_miss - B/op",
            "value": 9785,
            "unit": "B/op",
            "extra": "388 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=postgres+closure/check_miss - allocs/op",
            "value": 162,
            "unit": "allocs/op",
            "extra": "388 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=postgres+sets/lookup_hub",
            "value": 652130,
            "unit": "ns/op\t   11430 B/op\t     233 allocs/op",
            "extra": "529 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=postgres+sets/lookup_hub - ns/op",
            "value": 652130,
            "unit": "ns/op",
            "extra": "529 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=postgres+sets/lookup_hub - B/op",
            "value": 11430,
            "unit": "B/op",
            "extra": "529 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=postgres+sets/lookup_hub - allocs/op",
            "value": 233,
            "unit": "allocs/op",
            "extra": "529 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=postgres+sets/lookup_single_owner",
            "value": 536430,
            "unit": "ns/op\t    3531 B/op\t      73 allocs/op",
            "extra": "690 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=postgres+sets/lookup_single_owner - ns/op",
            "value": 536430,
            "unit": "ns/op",
            "extra": "690 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=postgres+sets/lookup_single_owner - B/op",
            "value": 3531,
            "unit": "B/op",
            "extra": "690 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=postgres+sets/lookup_single_owner - allocs/op",
            "value": 73,
            "unit": "allocs/op",
            "extra": "690 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=postgres+sets/check_miss",
            "value": 705006,
            "unit": "ns/op\t    6012 B/op\t      77 allocs/op",
            "extra": "528 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=postgres+sets/check_miss - ns/op",
            "value": 705006,
            "unit": "ns/op",
            "extra": "528 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=postgres+sets/check_miss - B/op",
            "value": 6012,
            "unit": "B/op",
            "extra": "528 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=postgres+sets/check_miss - allocs/op",
            "value": 77,
            "unit": "allocs/op",
            "extra": "528 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=spicedb-memdb/lookup_hub",
            "value": 644160,
            "unit": "ns/op\t   49197 B/op\t     618 allocs/op",
            "extra": "625 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=spicedb-memdb/lookup_hub - ns/op",
            "value": 644160,
            "unit": "ns/op",
            "extra": "625 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=spicedb-memdb/lookup_hub - B/op",
            "value": 49197,
            "unit": "B/op",
            "extra": "625 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=spicedb-memdb/lookup_hub - allocs/op",
            "value": 618,
            "unit": "allocs/op",
            "extra": "625 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=spicedb-memdb/lookup_single_owner",
            "value": 356228,
            "unit": "ns/op\t    7957 B/op\t     114 allocs/op",
            "extra": "930 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=spicedb-memdb/lookup_single_owner - ns/op",
            "value": 356228,
            "unit": "ns/op",
            "extra": "930 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=spicedb-memdb/lookup_single_owner - B/op",
            "value": 7957,
            "unit": "B/op",
            "extra": "930 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=spicedb-memdb/lookup_single_owner - allocs/op",
            "value": 114,
            "unit": "allocs/op",
            "extra": "930 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=spicedb-memdb/check_miss",
            "value": 334886,
            "unit": "ns/op\t    7397 B/op\t     108 allocs/op",
            "extra": "1050 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=spicedb-memdb/check_miss - ns/op",
            "value": 334886,
            "unit": "ns/op",
            "extra": "1050 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=spicedb-memdb/check_miss - B/op",
            "value": 7397,
            "unit": "B/op",
            "extra": "1050 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=spicedb-memdb/check_miss - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "1050 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=spicedb-postgres/lookup_hub",
            "value": 822614,
            "unit": "ns/op\t   44218 B/op\t     619 allocs/op",
            "extra": "414 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=spicedb-postgres/lookup_hub - ns/op",
            "value": 822614,
            "unit": "ns/op",
            "extra": "414 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=spicedb-postgres/lookup_hub - B/op",
            "value": 44218,
            "unit": "B/op",
            "extra": "414 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=spicedb-postgres/lookup_hub - allocs/op",
            "value": 619,
            "unit": "allocs/op",
            "extra": "414 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=spicedb-postgres/lookup_single_owner",
            "value": 643755,
            "unit": "ns/op\t    7877 B/op\t     114 allocs/op",
            "extra": "576 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=spicedb-postgres/lookup_single_owner - ns/op",
            "value": 643755,
            "unit": "ns/op",
            "extra": "576 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=spicedb-postgres/lookup_single_owner - B/op",
            "value": 7877,
            "unit": "B/op",
            "extra": "576 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=spicedb-postgres/lookup_single_owner - allocs/op",
            "value": 114,
            "unit": "allocs/op",
            "extra": "576 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=spicedb-postgres/check_miss",
            "value": 606278,
            "unit": "ns/op\t    7404 B/op\t     108 allocs/op",
            "extra": "612 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=spicedb-postgres/check_miss - ns/op",
            "value": 606278,
            "unit": "ns/op",
            "extra": "612 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=spicedb-postgres/check_miss - B/op",
            "value": 7404,
            "unit": "B/op",
            "extra": "612 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=hub_user/kind=spicedb-postgres/check_miss - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "612 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=memory/lookup_needle",
            "value": 2164673,
            "unit": "ns/op\t    2887 B/op\t      50 allocs/op",
            "extra": "171 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=memory/lookup_needle - ns/op",
            "value": 2164673,
            "unit": "ns/op",
            "extra": "171 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=memory/lookup_needle - B/op",
            "value": 2887,
            "unit": "B/op",
            "extra": "171 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=memory/lookup_needle - allocs/op",
            "value": 50,
            "unit": "allocs/op",
            "extra": "171 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=memory/check_needle",
            "value": 785912,
            "unit": "ns/op\t    1227 B/op\t      16 allocs/op",
            "extra": "412 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=memory/check_needle - ns/op",
            "value": 785912,
            "unit": "ns/op",
            "extra": "412 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=memory/check_needle - B/op",
            "value": 1227,
            "unit": "B/op",
            "extra": "412 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=memory/check_needle - allocs/op",
            "value": 16,
            "unit": "allocs/op",
            "extra": "412 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=memory/lookup_nobody",
            "value": 1058930,
            "unit": "ns/op\t    1311 B/op\t      24 allocs/op",
            "extra": "325 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=memory/lookup_nobody - ns/op",
            "value": 1058930,
            "unit": "ns/op",
            "extra": "325 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=memory/lookup_nobody - B/op",
            "value": 1311,
            "unit": "B/op",
            "extra": "325 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=memory/lookup_nobody - allocs/op",
            "value": 24,
            "unit": "allocs/op",
            "extra": "325 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=memory+index/lookup_needle",
            "value": 1971,
            "unit": "ns/op\t    1400 B/op\t      13 allocs/op",
            "extra": "195426 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=memory+index/lookup_needle - ns/op",
            "value": 1971,
            "unit": "ns/op",
            "extra": "195426 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=memory+index/lookup_needle - B/op",
            "value": 1400,
            "unit": "B/op",
            "extra": "195426 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=memory+index/lookup_needle - allocs/op",
            "value": 13,
            "unit": "allocs/op",
            "extra": "195426 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=memory+index/check_needle",
            "value": 1720,
            "unit": "ns/op\t     929 B/op\t      10 allocs/op",
            "extra": "223060 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=memory+index/check_needle - ns/op",
            "value": 1720,
            "unit": "ns/op",
            "extra": "223060 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=memory+index/check_needle - B/op",
            "value": 929,
            "unit": "B/op",
            "extra": "223060 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=memory+index/check_needle - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "223060 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=memory+index/lookup_nobody",
            "value": 1510,
            "unit": "ns/op\t     680 B/op\t       9 allocs/op",
            "extra": "244176 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=memory+index/lookup_nobody - ns/op",
            "value": 1510,
            "unit": "ns/op",
            "extra": "244176 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=memory+index/lookup_nobody - B/op",
            "value": 680,
            "unit": "B/op",
            "extra": "244176 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=memory+index/lookup_nobody - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "244176 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=postgres/lookup_needle",
            "value": 1031585,
            "unit": "ns/op\t   12760 B/op\t     209 allocs/op",
            "extra": "356 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=postgres/lookup_needle - ns/op",
            "value": 1031585,
            "unit": "ns/op",
            "extra": "356 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=postgres/lookup_needle - B/op",
            "value": 12760,
            "unit": "B/op",
            "extra": "356 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=postgres/lookup_needle - allocs/op",
            "value": 209,
            "unit": "allocs/op",
            "extra": "356 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=postgres/check_needle",
            "value": 413074,
            "unit": "ns/op\t    3945 B/op\t      65 allocs/op",
            "extra": "1017 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=postgres/check_needle - ns/op",
            "value": 413074,
            "unit": "ns/op",
            "extra": "1017 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=postgres/check_needle - B/op",
            "value": 3945,
            "unit": "B/op",
            "extra": "1017 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=postgres/check_needle - allocs/op",
            "value": 65,
            "unit": "allocs/op",
            "extra": "1017 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=postgres/lookup_nobody",
            "value": 636055,
            "unit": "ns/op\t    5830 B/op\t      98 allocs/op",
            "extra": "588 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=postgres/lookup_nobody - ns/op",
            "value": 636055,
            "unit": "ns/op",
            "extra": "588 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=postgres/lookup_nobody - B/op",
            "value": 5830,
            "unit": "B/op",
            "extra": "588 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=postgres/lookup_nobody - allocs/op",
            "value": 98,
            "unit": "allocs/op",
            "extra": "588 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=postgres+closure/lookup_needle",
            "value": 816220,
            "unit": "ns/op\t    4916 B/op\t     112 allocs/op",
            "extra": "475 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=postgres+closure/lookup_needle - ns/op",
            "value": 816220,
            "unit": "ns/op",
            "extra": "475 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=postgres+closure/lookup_needle - B/op",
            "value": 4916,
            "unit": "B/op",
            "extra": "475 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=postgres+closure/lookup_needle - allocs/op",
            "value": 112,
            "unit": "allocs/op",
            "extra": "475 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=postgres+closure/check_needle",
            "value": 845698,
            "unit": "ns/op\t   10385 B/op\t     174 allocs/op",
            "extra": "393 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=postgres+closure/check_needle - ns/op",
            "value": 845698,
            "unit": "ns/op",
            "extra": "393 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=postgres+closure/check_needle - B/op",
            "value": 10385,
            "unit": "B/op",
            "extra": "393 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=postgres+closure/check_needle - allocs/op",
            "value": 174,
            "unit": "allocs/op",
            "extra": "393 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=postgres+closure/lookup_nobody",
            "value": 795297,
            "unit": "ns/op\t    4493 B/op\t     103 allocs/op",
            "extra": "442 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=postgres+closure/lookup_nobody - ns/op",
            "value": 795297,
            "unit": "ns/op",
            "extra": "442 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=postgres+closure/lookup_nobody - B/op",
            "value": 4493,
            "unit": "B/op",
            "extra": "442 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=postgres+closure/lookup_nobody - allocs/op",
            "value": 103,
            "unit": "allocs/op",
            "extra": "442 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=postgres+sets/lookup_needle",
            "value": 554036,
            "unit": "ns/op\t    3553 B/op\t      73 allocs/op",
            "extra": "620 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=postgres+sets/lookup_needle - ns/op",
            "value": 554036,
            "unit": "ns/op",
            "extra": "620 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=postgres+sets/lookup_needle - B/op",
            "value": 3553,
            "unit": "B/op",
            "extra": "620 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=postgres+sets/lookup_needle - allocs/op",
            "value": 73,
            "unit": "allocs/op",
            "extra": "620 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=postgres+sets/check_needle",
            "value": 731933,
            "unit": "ns/op\t    5941 B/op\t      77 allocs/op",
            "extra": "532 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=postgres+sets/check_needle - ns/op",
            "value": 731933,
            "unit": "ns/op",
            "extra": "532 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=postgres+sets/check_needle - B/op",
            "value": 5941,
            "unit": "B/op",
            "extra": "532 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=postgres+sets/check_needle - allocs/op",
            "value": 77,
            "unit": "allocs/op",
            "extra": "532 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=postgres+sets/lookup_nobody",
            "value": 642871,
            "unit": "ns/op\t    3184 B/op\t      65 allocs/op",
            "extra": "616 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=postgres+sets/lookup_nobody - ns/op",
            "value": 642871,
            "unit": "ns/op",
            "extra": "616 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=postgres+sets/lookup_nobody - B/op",
            "value": 3184,
            "unit": "B/op",
            "extra": "616 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=postgres+sets/lookup_nobody - allocs/op",
            "value": 65,
            "unit": "allocs/op",
            "extra": "616 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=spicedb-memdb/lookup_needle",
            "value": 347940,
            "unit": "ns/op\t    7903 B/op\t     115 allocs/op",
            "extra": "1005 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=spicedb-memdb/lookup_needle - ns/op",
            "value": 347940,
            "unit": "ns/op",
            "extra": "1005 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=spicedb-memdb/lookup_needle - B/op",
            "value": 7903,
            "unit": "B/op",
            "extra": "1005 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=spicedb-memdb/lookup_needle - allocs/op",
            "value": 115,
            "unit": "allocs/op",
            "extra": "1005 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=spicedb-memdb/check_needle",
            "value": 326504,
            "unit": "ns/op\t    7430 B/op\t     108 allocs/op",
            "extra": "1059 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=spicedb-memdb/check_needle - ns/op",
            "value": 326504,
            "unit": "ns/op",
            "extra": "1059 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=spicedb-memdb/check_needle - B/op",
            "value": 7430,
            "unit": "B/op",
            "extra": "1059 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=spicedb-memdb/check_needle - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "1059 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=spicedb-memdb/lookup_nobody",
            "value": 330703,
            "unit": "ns/op\t    6351 B/op\t      91 allocs/op",
            "extra": "1059 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=spicedb-memdb/lookup_nobody - ns/op",
            "value": 330703,
            "unit": "ns/op",
            "extra": "1059 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=spicedb-memdb/lookup_nobody - B/op",
            "value": 6351,
            "unit": "B/op",
            "extra": "1059 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=spicedb-memdb/lookup_nobody - allocs/op",
            "value": 91,
            "unit": "allocs/op",
            "extra": "1059 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=spicedb-postgres/lookup_needle",
            "value": 610517,
            "unit": "ns/op\t    7884 B/op\t     114 allocs/op",
            "extra": "582 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=spicedb-postgres/lookup_needle - ns/op",
            "value": 610517,
            "unit": "ns/op",
            "extra": "582 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=spicedb-postgres/lookup_needle - B/op",
            "value": 7884,
            "unit": "B/op",
            "extra": "582 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=spicedb-postgres/lookup_needle - allocs/op",
            "value": 114,
            "unit": "allocs/op",
            "extra": "582 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=spicedb-postgres/check_needle",
            "value": 591643,
            "unit": "ns/op\t    7356 B/op\t     108 allocs/op",
            "extra": "550 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=spicedb-postgres/check_needle - ns/op",
            "value": 591643,
            "unit": "ns/op",
            "extra": "550 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=spicedb-postgres/check_needle - B/op",
            "value": 7356,
            "unit": "B/op",
            "extra": "550 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=spicedb-postgres/check_needle - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "550 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=spicedb-postgres/lookup_nobody",
            "value": 580143,
            "unit": "ns/op\t    6360 B/op\t      91 allocs/op",
            "extra": "543 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=spicedb-postgres/lookup_nobody - ns/op",
            "value": 580143,
            "unit": "ns/op",
            "extra": "543 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=spicedb-postgres/lookup_nobody - B/op",
            "value": 6360,
            "unit": "B/op",
            "extra": "543 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=needle/kind=spicedb-postgres/lookup_nobody - allocs/op",
            "value": 91,
            "unit": "allocs/op",
            "extra": "543 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=memory/check_last",
            "value": 6844454,
            "unit": "ns/op\t  654821 B/op\t    9805 allocs/op",
            "extra": "50 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=memory/check_last - ns/op",
            "value": 6844454,
            "unit": "ns/op",
            "extra": "50 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=memory/check_last - B/op",
            "value": 654821,
            "unit": "B/op",
            "extra": "50 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=memory/check_last - allocs/op",
            "value": 9805,
            "unit": "allocs/op",
            "extra": "50 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=memory/check_miss",
            "value": 7610297,
            "unit": "ns/op\t  753009 B/op\t   10023 allocs/op",
            "extra": "45 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=memory/check_miss - ns/op",
            "value": 7610297,
            "unit": "ns/op",
            "extra": "45 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=memory/check_miss - B/op",
            "value": 753009,
            "unit": "B/op",
            "extra": "45 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=memory/check_miss - allocs/op",
            "value": 10023,
            "unit": "allocs/op",
            "extra": "45 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=memory/subjects_teams",
            "value": 17178561,
            "unit": "ns/op\t11977191 B/op\t   18876 allocs/op",
            "extra": "24 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=memory/subjects_teams - ns/op",
            "value": 17178561,
            "unit": "ns/op",
            "extra": "24 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=memory/subjects_teams - B/op",
            "value": 11977191,
            "unit": "B/op",
            "extra": "24 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=memory/subjects_teams - allocs/op",
            "value": 18876,
            "unit": "allocs/op",
            "extra": "24 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=memory/subjects_users",
            "value": 16868160,
            "unit": "ns/op\t11972749 B/op\t   18777 allocs/op",
            "extra": "22 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=memory/subjects_users - ns/op",
            "value": 16868160,
            "unit": "ns/op",
            "extra": "22 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=memory/subjects_users - B/op",
            "value": 11972749,
            "unit": "B/op",
            "extra": "22 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=memory/subjects_users - allocs/op",
            "value": 18777,
            "unit": "allocs/op",
            "extra": "22 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=memory/lookup_one",
            "value": 514606,
            "unit": "ns/op\t    7065 B/op\t     130 allocs/op",
            "extra": "753 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=memory/lookup_one - ns/op",
            "value": 514606,
            "unit": "ns/op",
            "extra": "753 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=memory/lookup_one - B/op",
            "value": 7065,
            "unit": "B/op",
            "extra": "753 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=memory/lookup_one - allocs/op",
            "value": 130,
            "unit": "allocs/op",
            "extra": "753 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=memory+index/check_last",
            "value": 21058,
            "unit": "ns/op\t   25505 B/op\t      11 allocs/op",
            "extra": "17053 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=memory+index/check_last - ns/op",
            "value": 21058,
            "unit": "ns/op",
            "extra": "17053 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=memory+index/check_last - B/op",
            "value": 25505,
            "unit": "B/op",
            "extra": "17053 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=memory+index/check_last - allocs/op",
            "value": 11,
            "unit": "allocs/op",
            "extra": "17053 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=memory+index/check_miss",
            "value": 19863,
            "unit": "ns/op\t   25519 B/op\t      11 allocs/op",
            "extra": "18008 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=memory+index/check_miss - ns/op",
            "value": 19863,
            "unit": "ns/op",
            "extra": "18008 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=memory+index/check_miss - B/op",
            "value": 25519,
            "unit": "B/op",
            "extra": "18008 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=memory+index/check_miss - allocs/op",
            "value": 11,
            "unit": "allocs/op",
            "extra": "18008 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=memory+index/subjects_teams",
            "value": 228576,
            "unit": "ns/op\t  258330 B/op\t     867 allocs/op",
            "extra": "1800 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=memory+index/subjects_teams - ns/op",
            "value": 228576,
            "unit": "ns/op",
            "extra": "1800 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=memory+index/subjects_teams - B/op",
            "value": 258330,
            "unit": "B/op",
            "extra": "1800 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=memory+index/subjects_teams - allocs/op",
            "value": 867,
            "unit": "allocs/op",
            "extra": "1800 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=memory+index/subjects_users",
            "value": 180214,
            "unit": "ns/op\t  150923 B/op\t      49 allocs/op",
            "extra": "2204 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=memory+index/subjects_users - ns/op",
            "value": 180214,
            "unit": "ns/op",
            "extra": "2204 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=memory+index/subjects_users - B/op",
            "value": 150923,
            "unit": "B/op",
            "extra": "2204 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=memory+index/subjects_users - allocs/op",
            "value": 49,
            "unit": "allocs/op",
            "extra": "2204 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=memory+index/lookup_one",
            "value": 2037,
            "unit": "ns/op\t    1400 B/op\t      13 allocs/op",
            "extra": "191166 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=memory+index/lookup_one - ns/op",
            "value": 2037,
            "unit": "ns/op",
            "extra": "191166 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=memory+index/lookup_one - B/op",
            "value": 1400,
            "unit": "B/op",
            "extra": "191166 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=memory+index/lookup_one - allocs/op",
            "value": 13,
            "unit": "allocs/op",
            "extra": "191166 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres/check_last",
            "value": 59070203,
            "unit": "ns/op\t 1073460 B/op\t   17370 allocs/op",
            "extra": "6 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres/check_last - ns/op",
            "value": 59070203,
            "unit": "ns/op",
            "extra": "6 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres/check_last - B/op",
            "value": 1073460,
            "unit": "B/op",
            "extra": "6 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres/check_last - allocs/op",
            "value": 17370,
            "unit": "allocs/op",
            "extra": "6 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres/check_miss",
            "value": 62672299,
            "unit": "ns/op\t 1242561 B/op\t   19098 allocs/op",
            "extra": "6 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres/check_miss - ns/op",
            "value": 62672299,
            "unit": "ns/op",
            "extra": "6 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres/check_miss - B/op",
            "value": 1242561,
            "unit": "B/op",
            "extra": "6 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres/check_miss - allocs/op",
            "value": 19098,
            "unit": "allocs/op",
            "extra": "6 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres/subjects_teams",
            "value": 77141305,
            "unit": "ns/op\t12464705 B/op\t   27812 allocs/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres/subjects_teams - ns/op",
            "value": 77141305,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres/subjects_teams - B/op",
            "value": 12464705,
            "unit": "B/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres/subjects_teams - allocs/op",
            "value": 27812,
            "unit": "allocs/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres/subjects_users",
            "value": 78665088,
            "unit": "ns/op\t12458560 B/op\t   27837 allocs/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres/subjects_users - ns/op",
            "value": 78665088,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres/subjects_users - B/op",
            "value": 12458560,
            "unit": "B/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres/subjects_users - allocs/op",
            "value": 27837,
            "unit": "allocs/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres/lookup_one",
            "value": 3414617,
            "unit": "ns/op\t   46600 B/op\t     745 allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres/lookup_one - ns/op",
            "value": 3414617,
            "unit": "ns/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres/lookup_one - B/op",
            "value": 46600,
            "unit": "B/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres/lookup_one - allocs/op",
            "value": 745,
            "unit": "allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres+closure/check_last",
            "value": 579277,
            "unit": "ns/op\t    6052 B/op\t      96 allocs/op",
            "extra": "578 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres+closure/check_last - ns/op",
            "value": 579277,
            "unit": "ns/op",
            "extra": "578 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres+closure/check_last - B/op",
            "value": 6052,
            "unit": "B/op",
            "extra": "578 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres+closure/check_last - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "578 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres+closure/check_miss",
            "value": 970984,
            "unit": "ns/op\t    9919 B/op\t     162 allocs/op",
            "extra": "427 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres+closure/check_miss - ns/op",
            "value": 970984,
            "unit": "ns/op",
            "extra": "427 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres+closure/check_miss - B/op",
            "value": 9919,
            "unit": "B/op",
            "extra": "427 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres+closure/check_miss - allocs/op",
            "value": 162,
            "unit": "allocs/op",
            "extra": "427 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres+closure/subjects_teams",
            "value": 2102081,
            "unit": "ns/op\t  309709 B/op\t    3602 allocs/op",
            "extra": "170 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres+closure/subjects_teams - ns/op",
            "value": 2102081,
            "unit": "ns/op",
            "extra": "170 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres+closure/subjects_teams - B/op",
            "value": 309709,
            "unit": "B/op",
            "extra": "170 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres+closure/subjects_teams - allocs/op",
            "value": 3602,
            "unit": "allocs/op",
            "extra": "170 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres+closure/subjects_users",
            "value": 2080810,
            "unit": "ns/op\t  362619 B/op\t    3672 allocs/op",
            "extra": "183 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres+closure/subjects_users - ns/op",
            "value": 2080810,
            "unit": "ns/op",
            "extra": "183 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres+closure/subjects_users - B/op",
            "value": 362619,
            "unit": "B/op",
            "extra": "183 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres+closure/subjects_users - allocs/op",
            "value": 3672,
            "unit": "allocs/op",
            "extra": "183 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres+closure/lookup_one",
            "value": 787585,
            "unit": "ns/op\t    4872 B/op\t     109 allocs/op",
            "extra": "472 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres+closure/lookup_one - ns/op",
            "value": 787585,
            "unit": "ns/op",
            "extra": "472 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres+closure/lookup_one - B/op",
            "value": 4872,
            "unit": "B/op",
            "extra": "472 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres+closure/lookup_one - allocs/op",
            "value": 109,
            "unit": "allocs/op",
            "extra": "472 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres+sets/check_last",
            "value": 734015,
            "unit": "ns/op\t    5926 B/op\t      76 allocs/op",
            "extra": "475 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres+sets/check_last - ns/op",
            "value": 734015,
            "unit": "ns/op",
            "extra": "475 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres+sets/check_last - B/op",
            "value": 5926,
            "unit": "B/op",
            "extra": "475 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres+sets/check_last - allocs/op",
            "value": 76,
            "unit": "allocs/op",
            "extra": "475 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres+sets/check_miss",
            "value": 776832,
            "unit": "ns/op\t    6091 B/op\t      76 allocs/op",
            "extra": "518 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres+sets/check_miss - ns/op",
            "value": 776832,
            "unit": "ns/op",
            "extra": "518 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres+sets/check_miss - B/op",
            "value": 6091,
            "unit": "B/op",
            "extra": "518 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres+sets/check_miss - allocs/op",
            "value": 76,
            "unit": "allocs/op",
            "extra": "518 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres+sets/subjects_teams",
            "value": 2006201,
            "unit": "ns/op\t  309234 B/op\t    3602 allocs/op",
            "extra": "159 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres+sets/subjects_teams - ns/op",
            "value": 2006201,
            "unit": "ns/op",
            "extra": "159 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres+sets/subjects_teams - B/op",
            "value": 309234,
            "unit": "B/op",
            "extra": "159 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres+sets/subjects_teams - allocs/op",
            "value": 3602,
            "unit": "allocs/op",
            "extra": "159 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres+sets/subjects_users",
            "value": 1482083,
            "unit": "ns/op\t  102950 B/op\t    1594 allocs/op",
            "extra": "260 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres+sets/subjects_users - ns/op",
            "value": 1482083,
            "unit": "ns/op",
            "extra": "260 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres+sets/subjects_users - B/op",
            "value": 102950,
            "unit": "B/op",
            "extra": "260 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres+sets/subjects_users - allocs/op",
            "value": 1594,
            "unit": "allocs/op",
            "extra": "260 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres+sets/lookup_one",
            "value": 584004,
            "unit": "ns/op\t    3358 B/op\t      72 allocs/op",
            "extra": "632 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres+sets/lookup_one - ns/op",
            "value": 584004,
            "unit": "ns/op",
            "extra": "632 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres+sets/lookup_one - B/op",
            "value": 3358,
            "unit": "B/op",
            "extra": "632 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=postgres+sets/lookup_one - allocs/op",
            "value": 72,
            "unit": "allocs/op",
            "extra": "632 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=spicedb-memdb/check_last",
            "value": 339143,
            "unit": "ns/op\t    7365 B/op\t     108 allocs/op",
            "extra": "1078 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=spicedb-memdb/check_last - ns/op",
            "value": 339143,
            "unit": "ns/op",
            "extra": "1078 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=spicedb-memdb/check_last - B/op",
            "value": 7365,
            "unit": "B/op",
            "extra": "1078 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=spicedb-memdb/check_last - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "1078 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=spicedb-memdb/check_miss",
            "value": 328714,
            "unit": "ns/op\t    7428 B/op\t     108 allocs/op",
            "extra": "1063 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=spicedb-memdb/check_miss - ns/op",
            "value": 328714,
            "unit": "ns/op",
            "extra": "1063 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=spicedb-memdb/check_miss - B/op",
            "value": 7428,
            "unit": "B/op",
            "extra": "1063 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=spicedb-memdb/check_miss - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "1063 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=spicedb-memdb/subjects_teams",
            "value": 2594973,
            "unit": "ns/op\t  595707 B/op\t   10159 allocs/op",
            "extra": "135 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=spicedb-memdb/subjects_teams - ns/op",
            "value": 2594973,
            "unit": "ns/op",
            "extra": "135 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=spicedb-memdb/subjects_teams - B/op",
            "value": 595707,
            "unit": "B/op",
            "extra": "135 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=spicedb-memdb/subjects_teams - allocs/op",
            "value": 10159,
            "unit": "allocs/op",
            "extra": "135 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=spicedb-memdb/subjects_users",
            "value": 1506517,
            "unit": "ns/op\t  304779 B/op\t    5136 allocs/op",
            "extra": "249 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=spicedb-memdb/subjects_users - ns/op",
            "value": 1506517,
            "unit": "ns/op",
            "extra": "249 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=spicedb-memdb/subjects_users - B/op",
            "value": 304779,
            "unit": "B/op",
            "extra": "249 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=spicedb-memdb/subjects_users - allocs/op",
            "value": 5136,
            "unit": "allocs/op",
            "extra": "249 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=spicedb-memdb/lookup_one",
            "value": 361084,
            "unit": "ns/op\t    7976 B/op\t     113 allocs/op",
            "extra": "888 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=spicedb-memdb/lookup_one - ns/op",
            "value": 361084,
            "unit": "ns/op",
            "extra": "888 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=spicedb-memdb/lookup_one - B/op",
            "value": 7976,
            "unit": "B/op",
            "extra": "888 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=spicedb-memdb/lookup_one - allocs/op",
            "value": 113,
            "unit": "allocs/op",
            "extra": "888 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=spicedb-postgres/check_last",
            "value": 572699,
            "unit": "ns/op\t    7408 B/op\t     108 allocs/op",
            "extra": "590 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=spicedb-postgres/check_last - ns/op",
            "value": 572699,
            "unit": "ns/op",
            "extra": "590 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=spicedb-postgres/check_last - B/op",
            "value": 7408,
            "unit": "B/op",
            "extra": "590 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=spicedb-postgres/check_last - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "590 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=spicedb-postgres/check_miss",
            "value": 581167,
            "unit": "ns/op\t    7358 B/op\t     108 allocs/op",
            "extra": "535 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=spicedb-postgres/check_miss - ns/op",
            "value": 581167,
            "unit": "ns/op",
            "extra": "535 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=spicedb-postgres/check_miss - B/op",
            "value": 7358,
            "unit": "B/op",
            "extra": "535 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=spicedb-postgres/check_miss - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "535 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=spicedb-postgres/subjects_teams",
            "value": 2655009,
            "unit": "ns/op\t  553650 B/op\t   10133 allocs/op",
            "extra": "129 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=spicedb-postgres/subjects_teams - ns/op",
            "value": 2655009,
            "unit": "ns/op",
            "extra": "129 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=spicedb-postgres/subjects_teams - B/op",
            "value": 553650,
            "unit": "B/op",
            "extra": "129 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=spicedb-postgres/subjects_teams - allocs/op",
            "value": 10133,
            "unit": "allocs/op",
            "extra": "129 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=spicedb-postgres/subjects_users",
            "value": 1895827,
            "unit": "ns/op\t  283179 B/op\t    5144 allocs/op",
            "extra": "204 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=spicedb-postgres/subjects_users - ns/op",
            "value": 1895827,
            "unit": "ns/op",
            "extra": "204 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=spicedb-postgres/subjects_users - B/op",
            "value": 283179,
            "unit": "B/op",
            "extra": "204 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=spicedb-postgres/subjects_users - allocs/op",
            "value": 5144,
            "unit": "allocs/op",
            "extra": "204 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=spicedb-postgres/lookup_one",
            "value": 604920,
            "unit": "ns/op\t    7908 B/op\t     113 allocs/op",
            "extra": "571 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=spicedb-postgres/lookup_one - ns/op",
            "value": 604920,
            "unit": "ns/op",
            "extra": "571 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=spicedb-postgres/lookup_one - B/op",
            "value": 7908,
            "unit": "B/op",
            "extra": "571 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=fan_in/kind=spicedb-postgres/lookup_one - allocs/op",
            "value": 113,
            "unit": "allocs/op",
            "extra": "571 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=memory/check_top",
            "value": 151863,
            "unit": "ns/op\t   47075 B/op\t     526 allocs/op",
            "extra": "2401 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=memory/check_top - ns/op",
            "value": 151863,
            "unit": "ns/op",
            "extra": "2401 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=memory/check_top - B/op",
            "value": 47075,
            "unit": "B/op",
            "extra": "2401 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=memory/check_top - allocs/op",
            "value": 526,
            "unit": "allocs/op",
            "extra": "2401 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=memory/lookup_all_layers",
            "value": 4465793,
            "unit": "ns/op\t 2593159 B/op\t   40879 allocs/op",
            "extra": "90 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=memory/lookup_all_layers - ns/op",
            "value": 4465793,
            "unit": "ns/op",
            "extra": "90 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=memory/lookup_all_layers - B/op",
            "value": 2593159,
            "unit": "B/op",
            "extra": "90 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=memory/lookup_all_layers - allocs/op",
            "value": 40879,
            "unit": "allocs/op",
            "extra": "90 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=memory/toggle_bottom_edge",
            "value": 189505,
            "unit": "ns/op\t  492947 B/op\t      22 allocs/op",
            "extra": "3012 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=memory/toggle_bottom_edge - ns/op",
            "value": 189505,
            "unit": "ns/op",
            "extra": "3012 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=memory/toggle_bottom_edge - B/op",
            "value": 492947,
            "unit": "B/op",
            "extra": "3012 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=memory/toggle_bottom_edge - allocs/op",
            "value": 22,
            "unit": "allocs/op",
            "extra": "3012 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=memory+index/check_top",
            "value": 2521,
            "unit": "ns/op\t    3993 B/op\t      11 allocs/op",
            "extra": "164325 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=memory+index/check_top - ns/op",
            "value": 2521,
            "unit": "ns/op",
            "extra": "164325 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=memory+index/check_top - B/op",
            "value": 3993,
            "unit": "B/op",
            "extra": "164325 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=memory+index/check_top - allocs/op",
            "value": 11,
            "unit": "allocs/op",
            "extra": "164325 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=memory+index/lookup_all_layers",
            "value": 18113,
            "unit": "ns/op\t   16335 B/op\t      31 allocs/op",
            "extra": "19549 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=memory+index/lookup_all_layers - ns/op",
            "value": 18113,
            "unit": "ns/op",
            "extra": "19549 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=memory+index/lookup_all_layers - B/op",
            "value": 16335,
            "unit": "B/op",
            "extra": "19549 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=memory+index/lookup_all_layers - allocs/op",
            "value": 31,
            "unit": "allocs/op",
            "extra": "19549 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=memory+index/toggle_bottom_edge",
            "value": 185314,
            "unit": "ns/op\t  492993 B/op\t      22 allocs/op",
            "extra": "2956 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=memory+index/toggle_bottom_edge - ns/op",
            "value": 185314,
            "unit": "ns/op",
            "extra": "2956 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=memory+index/toggle_bottom_edge - B/op",
            "value": 492993,
            "unit": "B/op",
            "extra": "2956 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=memory+index/toggle_bottom_edge - allocs/op",
            "value": 22,
            "unit": "allocs/op",
            "extra": "2956 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=postgres/check_top",
            "value": 968139,
            "unit": "ns/op\t   44530 B/op\t     642 allocs/op",
            "extra": "394 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=postgres/check_top - ns/op",
            "value": 968139,
            "unit": "ns/op",
            "extra": "394 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=postgres/check_top - B/op",
            "value": 44530,
            "unit": "B/op",
            "extra": "394 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=postgres/check_top - allocs/op",
            "value": 642,
            "unit": "allocs/op",
            "extra": "394 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=postgres/lookup_all_layers",
            "value": 5482636,
            "unit": "ns/op\t 1123869 B/op\t   17148 allocs/op",
            "extra": "69 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=postgres/lookup_all_layers - ns/op",
            "value": 5482636,
            "unit": "ns/op",
            "extra": "69 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=postgres/lookup_all_layers - B/op",
            "value": 1123869,
            "unit": "B/op",
            "extra": "69 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=postgres/lookup_all_layers - allocs/op",
            "value": 17148,
            "unit": "allocs/op",
            "extra": "69 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=postgres/toggle_bottom_edge",
            "value": 5652806,
            "unit": "ns/op\t   11127 B/op\t     148 allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=postgres/toggle_bottom_edge - ns/op",
            "value": 5652806,
            "unit": "ns/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=postgres/toggle_bottom_edge - B/op",
            "value": 11127,
            "unit": "B/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=postgres/toggle_bottom_edge - allocs/op",
            "value": 148,
            "unit": "allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=postgres+closure/check_top",
            "value": 586500,
            "unit": "ns/op\t    5772 B/op\t      96 allocs/op",
            "extra": "715 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=postgres+closure/check_top - ns/op",
            "value": 586500,
            "unit": "ns/op",
            "extra": "715 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=postgres+closure/check_top - B/op",
            "value": 5772,
            "unit": "B/op",
            "extra": "715 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=postgres+closure/check_top - allocs/op",
            "value": 96,
            "unit": "allocs/op",
            "extra": "715 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=postgres+closure/lookup_all_layers",
            "value": 610445,
            "unit": "ns/op\t   14961 B/op\t     257 allocs/op",
            "extra": "602 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=postgres+closure/lookup_all_layers - ns/op",
            "value": 610445,
            "unit": "ns/op",
            "extra": "602 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=postgres+closure/lookup_all_layers - B/op",
            "value": 14961,
            "unit": "B/op",
            "extra": "602 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=postgres+closure/lookup_all_layers - allocs/op",
            "value": 257,
            "unit": "allocs/op",
            "extra": "602 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=postgres+closure/toggle_bottom_edge",
            "value": 20764615,
            "unit": "ns/op\t   44864 B/op\t     631 allocs/op",
            "extra": "43 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=postgres+closure/toggle_bottom_edge - ns/op",
            "value": 20764615,
            "unit": "ns/op",
            "extra": "43 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=postgres+closure/toggle_bottom_edge - B/op",
            "value": 44864,
            "unit": "B/op",
            "extra": "43 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=postgres+closure/toggle_bottom_edge - allocs/op",
            "value": 631,
            "unit": "allocs/op",
            "extra": "43 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=postgres+sets/check_top",
            "value": 799570,
            "unit": "ns/op\t    5841 B/op\t      76 allocs/op",
            "extra": "466 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=postgres+sets/check_top - ns/op",
            "value": 799570,
            "unit": "ns/op",
            "extra": "466 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=postgres+sets/check_top - B/op",
            "value": 5841,
            "unit": "B/op",
            "extra": "466 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=postgres+sets/check_top - allocs/op",
            "value": 76,
            "unit": "allocs/op",
            "extra": "466 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=postgres+sets/lookup_all_layers",
            "value": 580204,
            "unit": "ns/op\t   14827 B/op\t     257 allocs/op",
            "extra": "604 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=postgres+sets/lookup_all_layers - ns/op",
            "value": 580204,
            "unit": "ns/op",
            "extra": "604 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=postgres+sets/lookup_all_layers - B/op",
            "value": 14827,
            "unit": "B/op",
            "extra": "604 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=postgres+sets/lookup_all_layers - allocs/op",
            "value": 257,
            "unit": "allocs/op",
            "extra": "604 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=postgres+sets/toggle_bottom_edge",
            "value": 17760012,
            "unit": "ns/op\t   47280 B/op\t     952 allocs/op",
            "extra": "50 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=postgres+sets/toggle_bottom_edge - ns/op",
            "value": 17760012,
            "unit": "ns/op",
            "extra": "50 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=postgres+sets/toggle_bottom_edge - B/op",
            "value": 47280,
            "unit": "B/op",
            "extra": "50 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=postgres+sets/toggle_bottom_edge - allocs/op",
            "value": 952,
            "unit": "allocs/op",
            "extra": "50 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=spicedb-memdb/check_top",
            "value": 339944,
            "unit": "ns/op\t    7363 B/op\t     108 allocs/op",
            "extra": "1047 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=spicedb-memdb/check_top - ns/op",
            "value": 339944,
            "unit": "ns/op",
            "extra": "1047 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=spicedb-memdb/check_top - B/op",
            "value": 7363,
            "unit": "B/op",
            "extra": "1047 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=spicedb-memdb/check_top - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "1047 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=spicedb-memdb/lookup_all_layers",
            "value": 699386,
            "unit": "ns/op\t   59838 B/op\t     731 allocs/op",
            "extra": "525 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=spicedb-memdb/lookup_all_layers - ns/op",
            "value": 699386,
            "unit": "ns/op",
            "extra": "525 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=spicedb-memdb/lookup_all_layers - B/op",
            "value": 59838,
            "unit": "B/op",
            "extra": "525 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=spicedb-memdb/lookup_all_layers - allocs/op",
            "value": 731,
            "unit": "allocs/op",
            "extra": "525 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=spicedb-memdb/toggle_bottom_edge",
            "value": 775025,
            "unit": "ns/op\t   15200 B/op\t     225 allocs/op",
            "extra": "440 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=spicedb-memdb/toggle_bottom_edge - ns/op",
            "value": 775025,
            "unit": "ns/op",
            "extra": "440 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=spicedb-memdb/toggle_bottom_edge - B/op",
            "value": 15200,
            "unit": "B/op",
            "extra": "440 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=spicedb-memdb/toggle_bottom_edge - allocs/op",
            "value": 225,
            "unit": "allocs/op",
            "extra": "440 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=spicedb-postgres/check_top",
            "value": 586519,
            "unit": "ns/op\t    7355 B/op\t     108 allocs/op",
            "extra": "571 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=spicedb-postgres/check_top - ns/op",
            "value": 586519,
            "unit": "ns/op",
            "extra": "571 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=spicedb-postgres/check_top - B/op",
            "value": 7355,
            "unit": "B/op",
            "extra": "571 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=spicedb-postgres/check_top - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "571 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=spicedb-postgres/lookup_all_layers",
            "value": 936374,
            "unit": "ns/op\t   55092 B/op\t     732 allocs/op",
            "extra": "417 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=spicedb-postgres/lookup_all_layers - ns/op",
            "value": 936374,
            "unit": "ns/op",
            "extra": "417 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=spicedb-postgres/lookup_all_layers - B/op",
            "value": 55092,
            "unit": "B/op",
            "extra": "417 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=spicedb-postgres/lookup_all_layers - allocs/op",
            "value": 732,
            "unit": "allocs/op",
            "extra": "417 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=spicedb-postgres/toggle_bottom_edge",
            "value": 30456079,
            "unit": "ns/op\t   18762 B/op\t     226 allocs/op",
            "extra": "38 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=spicedb-postgres/toggle_bottom_edge - ns/op",
            "value": 30456079,
            "unit": "ns/op",
            "extra": "38 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=spicedb-postgres/toggle_bottom_edge - B/op",
            "value": 18762,
            "unit": "B/op",
            "extra": "38 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=dag/kind=spicedb-postgres/toggle_bottom_edge - allocs/op",
            "value": 226,
            "unit": "allocs/op",
            "extra": "38 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=memory/check_leaf",
            "value": 65647,
            "unit": "ns/op\t   27911 B/op\t     263 allocs/op",
            "extra": "6322 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=memory/check_leaf - ns/op",
            "value": 65647,
            "unit": "ns/op",
            "extra": "6322 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=memory/check_leaf - B/op",
            "value": 27911,
            "unit": "B/op",
            "extra": "6322 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=memory/check_leaf - allocs/op",
            "value": 263,
            "unit": "allocs/op",
            "extra": "6322 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=memory/check_miss",
            "value": 66617,
            "unit": "ns/op\t   28037 B/op\t     265 allocs/op",
            "extra": "5576 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=memory/check_miss - ns/op",
            "value": 66617,
            "unit": "ns/op",
            "extra": "5576 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=memory/check_miss - B/op",
            "value": 28037,
            "unit": "B/op",
            "extra": "5576 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=memory/check_miss - allocs/op",
            "value": 265,
            "unit": "allocs/op",
            "extra": "5576 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=memory/lookup_all_folders",
            "value": 425124,
            "unit": "ns/op\t  233943 B/op\t     885 allocs/op",
            "extra": "801 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=memory/lookup_all_folders - ns/op",
            "value": 425124,
            "unit": "ns/op",
            "extra": "801 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=memory/lookup_all_folders - B/op",
            "value": 233943,
            "unit": "B/op",
            "extra": "801 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=memory/lookup_all_folders - allocs/op",
            "value": 885,
            "unit": "allocs/op",
            "extra": "801 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=memory/subjects_leaf",
            "value": 82922,
            "unit": "ns/op\t   58021 B/op\t     567 allocs/op",
            "extra": "5095 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=memory/subjects_leaf - ns/op",
            "value": 82922,
            "unit": "ns/op",
            "extra": "5095 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=memory/subjects_leaf - B/op",
            "value": 58021,
            "unit": "B/op",
            "extra": "5095 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=memory/subjects_leaf - allocs/op",
            "value": 567,
            "unit": "allocs/op",
            "extra": "5095 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=memory+index/check_leaf",
            "value": 2394,
            "unit": "ns/op\t    3665 B/op\t       8 allocs/op",
            "extra": "191696 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=memory+index/check_leaf - ns/op",
            "value": 2394,
            "unit": "ns/op",
            "extra": "191696 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=memory+index/check_leaf - B/op",
            "value": 3665,
            "unit": "B/op",
            "extra": "191696 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=memory+index/check_leaf - allocs/op",
            "value": 8,
            "unit": "allocs/op",
            "extra": "191696 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=memory+index/check_miss",
            "value": 3337,
            "unit": "ns/op\t    3666 B/op\t       8 allocs/op",
            "extra": "127960 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=memory+index/check_miss - ns/op",
            "value": 3337,
            "unit": "ns/op",
            "extra": "127960 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=memory+index/check_miss - B/op",
            "value": 3666,
            "unit": "B/op",
            "extra": "127960 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=memory+index/check_miss - allocs/op",
            "value": 8,
            "unit": "allocs/op",
            "extra": "127960 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=memory+index/lookup_all_folders",
            "value": 10553,
            "unit": "ns/op\t    8750 B/op\t      27 allocs/op",
            "extra": "36822 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=memory+index/lookup_all_folders - ns/op",
            "value": 10553,
            "unit": "ns/op",
            "extra": "36822 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=memory+index/lookup_all_folders - B/op",
            "value": 8750,
            "unit": "B/op",
            "extra": "36822 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=memory+index/lookup_all_folders - allocs/op",
            "value": 27,
            "unit": "allocs/op",
            "extra": "36822 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=memory+index/subjects_leaf",
            "value": 3579,
            "unit": "ns/op\t    4377 B/op\t      16 allocs/op",
            "extra": "118435 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=memory+index/subjects_leaf - ns/op",
            "value": 3579,
            "unit": "ns/op",
            "extra": "118435 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=memory+index/subjects_leaf - B/op",
            "value": 4377,
            "unit": "B/op",
            "extra": "118435 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=memory+index/subjects_leaf - allocs/op",
            "value": 16,
            "unit": "allocs/op",
            "extra": "118435 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres/check_leaf",
            "value": 8129078,
            "unit": "ns/op\t  104525 B/op\t    1570 allocs/op",
            "extra": "50 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres/check_leaf - ns/op",
            "value": 8129078,
            "unit": "ns/op",
            "extra": "50 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres/check_leaf - B/op",
            "value": 104525,
            "unit": "B/op",
            "extra": "50 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres/check_leaf - allocs/op",
            "value": 1570,
            "unit": "allocs/op",
            "extra": "50 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres/check_miss",
            "value": 7875198,
            "unit": "ns/op\t  105596 B/op\t    1590 allocs/op",
            "extra": "54 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres/check_miss - ns/op",
            "value": 7875198,
            "unit": "ns/op",
            "extra": "54 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres/check_miss - B/op",
            "value": 105596,
            "unit": "B/op",
            "extra": "54 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres/check_miss - allocs/op",
            "value": 1590,
            "unit": "allocs/op",
            "extra": "54 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres/lookup_all_folders",
            "value": 8036540,
            "unit": "ns/op\t  439515 B/op\t    6106 allocs/op",
            "extra": "42 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres/lookup_all_folders - ns/op",
            "value": 8036540,
            "unit": "ns/op",
            "extra": "42 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres/lookup_all_folders - B/op",
            "value": 439515,
            "unit": "B/op",
            "extra": "42 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres/lookup_all_folders - allocs/op",
            "value": 6106,
            "unit": "allocs/op",
            "extra": "42 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres/subjects_leaf",
            "value": 7218246,
            "unit": "ns/op\t  134194 B/op\t    1892 allocs/op",
            "extra": "45 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres/subjects_leaf - ns/op",
            "value": 7218246,
            "unit": "ns/op",
            "extra": "45 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres/subjects_leaf - B/op",
            "value": 134194,
            "unit": "B/op",
            "extra": "45 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres/subjects_leaf - allocs/op",
            "value": 1892,
            "unit": "allocs/op",
            "extra": "45 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres+closure/check_leaf",
            "value": 13486646,
            "unit": "ns/op\t  202067 B/op\t    3189 allocs/op",
            "extra": "24 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres+closure/check_leaf - ns/op",
            "value": 13486646,
            "unit": "ns/op",
            "extra": "24 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres+closure/check_leaf - B/op",
            "value": 202067,
            "unit": "B/op",
            "extra": "24 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres+closure/check_leaf - allocs/op",
            "value": 3189,
            "unit": "allocs/op",
            "extra": "24 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres+closure/check_miss",
            "value": 14289832,
            "unit": "ns/op\t  203545 B/op\t    3230 allocs/op",
            "extra": "22 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres+closure/check_miss - ns/op",
            "value": 14289832,
            "unit": "ns/op",
            "extra": "22 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres+closure/check_miss - B/op",
            "value": 203545,
            "unit": "B/op",
            "extra": "22 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres+closure/check_miss - allocs/op",
            "value": 3230,
            "unit": "allocs/op",
            "extra": "22 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres+closure/lookup_all_folders",
            "value": 12612029,
            "unit": "ns/op\t  430765 B/op\t    6479 allocs/op",
            "extra": "27 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres+closure/lookup_all_folders - ns/op",
            "value": 12612029,
            "unit": "ns/op",
            "extra": "27 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres+closure/lookup_all_folders - B/op",
            "value": 430765,
            "unit": "B/op",
            "extra": "27 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres+closure/lookup_all_folders - allocs/op",
            "value": 6479,
            "unit": "allocs/op",
            "extra": "27 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres+closure/subjects_leaf",
            "value": 13287554,
            "unit": "ns/op\t  182335 B/op\t    2881 allocs/op",
            "extra": "24 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres+closure/subjects_leaf - ns/op",
            "value": 13287554,
            "unit": "ns/op",
            "extra": "24 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres+closure/subjects_leaf - B/op",
            "value": 182335,
            "unit": "B/op",
            "extra": "24 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres+closure/subjects_leaf - allocs/op",
            "value": 2881,
            "unit": "allocs/op",
            "extra": "24 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres+sets/check_leaf",
            "value": 771777,
            "unit": "ns/op\t    5965 B/op\t      74 allocs/op",
            "extra": "488 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres+sets/check_leaf - ns/op",
            "value": 771777,
            "unit": "ns/op",
            "extra": "488 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres+sets/check_leaf - B/op",
            "value": 5965,
            "unit": "B/op",
            "extra": "488 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres+sets/check_leaf - allocs/op",
            "value": 74,
            "unit": "allocs/op",
            "extra": "488 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres+sets/check_miss",
            "value": 699851,
            "unit": "ns/op\t    5955 B/op\t      74 allocs/op",
            "extra": "514 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres+sets/check_miss - ns/op",
            "value": 699851,
            "unit": "ns/op",
            "extra": "514 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres+sets/check_miss - B/op",
            "value": 5955,
            "unit": "B/op",
            "extra": "514 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres+sets/check_miss - allocs/op",
            "value": 74,
            "unit": "allocs/op",
            "extra": "514 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres+sets/lookup_all_folders",
            "value": 844859,
            "unit": "ns/op\t    8978 B/op\t     169 allocs/op",
            "extra": "445 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres+sets/lookup_all_folders - ns/op",
            "value": 844859,
            "unit": "ns/op",
            "extra": "445 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres+sets/lookup_all_folders - B/op",
            "value": 8978,
            "unit": "B/op",
            "extra": "445 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres+sets/lookup_all_folders - allocs/op",
            "value": 169,
            "unit": "allocs/op",
            "extra": "445 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres+sets/subjects_leaf",
            "value": 702834,
            "unit": "ns/op\t    3699 B/op\t      71 allocs/op",
            "extra": "544 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres+sets/subjects_leaf - ns/op",
            "value": 702834,
            "unit": "ns/op",
            "extra": "544 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres+sets/subjects_leaf - B/op",
            "value": 3699,
            "unit": "B/op",
            "extra": "544 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=postgres+sets/subjects_leaf - allocs/op",
            "value": 71,
            "unit": "allocs/op",
            "extra": "544 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=spicedb-memdb/check_leaf",
            "value": 342981,
            "unit": "ns/op\t    7338 B/op\t     108 allocs/op",
            "extra": "1051 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=spicedb-memdb/check_leaf - ns/op",
            "value": 342981,
            "unit": "ns/op",
            "extra": "1051 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=spicedb-memdb/check_leaf - B/op",
            "value": 7338,
            "unit": "B/op",
            "extra": "1051 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=spicedb-memdb/check_leaf - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "1051 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=spicedb-memdb/check_miss",
            "value": 327477,
            "unit": "ns/op\t    7336 B/op\t     108 allocs/op",
            "extra": "1076 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=spicedb-memdb/check_miss - ns/op",
            "value": 327477,
            "unit": "ns/op",
            "extra": "1076 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=spicedb-memdb/check_miss - B/op",
            "value": 7336,
            "unit": "B/op",
            "extra": "1076 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=spicedb-memdb/check_miss - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "1076 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=spicedb-memdb/lookup_all_folders",
            "value": 614508,
            "unit": "ns/op\t   47645 B/op\t     417 allocs/op",
            "extra": "576 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=spicedb-memdb/lookup_all_folders - ns/op",
            "value": 614508,
            "unit": "ns/op",
            "extra": "576 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=spicedb-memdb/lookup_all_folders - B/op",
            "value": 47645,
            "unit": "B/op",
            "extra": "576 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=spicedb-memdb/lookup_all_folders - allocs/op",
            "value": 417,
            "unit": "allocs/op",
            "extra": "576 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=spicedb-memdb/subjects_leaf",
            "value": 335731,
            "unit": "ns/op\t    7777 B/op\t     114 allocs/op",
            "extra": "1023 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=spicedb-memdb/subjects_leaf - ns/op",
            "value": 335731,
            "unit": "ns/op",
            "extra": "1023 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=spicedb-memdb/subjects_leaf - B/op",
            "value": 7777,
            "unit": "B/op",
            "extra": "1023 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=spicedb-memdb/subjects_leaf - allocs/op",
            "value": 114,
            "unit": "allocs/op",
            "extra": "1023 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=spicedb-postgres/check_leaf",
            "value": 596122,
            "unit": "ns/op\t    7362 B/op\t     109 allocs/op",
            "extra": "608 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=spicedb-postgres/check_leaf - ns/op",
            "value": 596122,
            "unit": "ns/op",
            "extra": "608 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=spicedb-postgres/check_leaf - B/op",
            "value": 7362,
            "unit": "B/op",
            "extra": "608 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=spicedb-postgres/check_leaf - allocs/op",
            "value": 109,
            "unit": "allocs/op",
            "extra": "608 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=spicedb-postgres/check_miss",
            "value": 653639,
            "unit": "ns/op\t    7408 B/op\t     108 allocs/op",
            "extra": "586 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=spicedb-postgres/check_miss - ns/op",
            "value": 653639,
            "unit": "ns/op",
            "extra": "586 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=spicedb-postgres/check_miss - B/op",
            "value": 7408,
            "unit": "B/op",
            "extra": "586 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=spicedb-postgres/check_miss - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "586 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=spicedb-postgres/lookup_all_folders",
            "value": 850473,
            "unit": "ns/op\t   45359 B/op\t     418 allocs/op",
            "extra": "416 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=spicedb-postgres/lookup_all_folders - ns/op",
            "value": 850473,
            "unit": "ns/op",
            "extra": "416 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=spicedb-postgres/lookup_all_folders - B/op",
            "value": 45359,
            "unit": "B/op",
            "extra": "416 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=spicedb-postgres/lookup_all_folders - allocs/op",
            "value": 418,
            "unit": "allocs/op",
            "extra": "416 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=spicedb-postgres/subjects_leaf",
            "value": 587173,
            "unit": "ns/op\t    7801 B/op\t     114 allocs/op",
            "extra": "618 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=spicedb-postgres/subjects_leaf - ns/op",
            "value": 587173,
            "unit": "ns/op",
            "extra": "618 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=spicedb-postgres/subjects_leaf - B/op",
            "value": 7801,
            "unit": "B/op",
            "extra": "618 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=arrow_chain/kind=spicedb-postgres/subjects_leaf - allocs/op",
            "value": 114,
            "unit": "allocs/op",
            "extra": "618 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=memory/check_unbanned",
            "value": 7322167,
            "unit": "ns/op\t 1762683 B/op\t      35 allocs/op",
            "extra": "48 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=memory/check_unbanned - ns/op",
            "value": 7322167,
            "unit": "ns/op",
            "extra": "48 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=memory/check_unbanned - B/op",
            "value": 1762683,
            "unit": "B/op",
            "extra": "48 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=memory/check_unbanned - allocs/op",
            "value": 35,
            "unit": "allocs/op",
            "extra": "48 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=memory/check_banned",
            "value": 7166935,
            "unit": "ns/op\t 1761900 B/op\t      35 allocs/op",
            "extra": "51 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=memory/check_banned - ns/op",
            "value": 7166935,
            "unit": "ns/op",
            "extra": "51 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=memory/check_banned - B/op",
            "value": 1761900,
            "unit": "B/op",
            "extra": "51 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=memory/check_banned - allocs/op",
            "value": 35,
            "unit": "allocs/op",
            "extra": "51 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=memory/subjects_wildcard_minus",
            "value": 8457329,
            "unit": "ns/op\t 2718672 B/op\t     141 allocs/op",
            "extra": "43 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=memory/subjects_wildcard_minus - ns/op",
            "value": 8457329,
            "unit": "ns/op",
            "extra": "43 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=memory/subjects_wildcard_minus - B/op",
            "value": 2718672,
            "unit": "B/op",
            "extra": "43 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=memory/subjects_wildcard_minus - allocs/op",
            "value": 141,
            "unit": "allocs/op",
            "extra": "43 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=memory/lookup_banned",
            "value": 220328,
            "unit": "ns/op\t    1600 B/op\t      26 allocs/op",
            "extra": "1610 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=memory/lookup_banned - ns/op",
            "value": 220328,
            "unit": "ns/op",
            "extra": "1610 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=memory/lookup_banned - B/op",
            "value": 1600,
            "unit": "B/op",
            "extra": "1610 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=memory/lookup_banned - allocs/op",
            "value": 26,
            "unit": "allocs/op",
            "extra": "1610 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=memory/lookup_unbanned",
            "value": 238217,
            "unit": "ns/op\t    1541 B/op\t      25 allocs/op",
            "extra": "1653 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=memory/lookup_unbanned - ns/op",
            "value": 238217,
            "unit": "ns/op",
            "extra": "1653 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=memory/lookup_unbanned - B/op",
            "value": 1541,
            "unit": "B/op",
            "extra": "1653 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=memory/lookup_unbanned - allocs/op",
            "value": 25,
            "unit": "allocs/op",
            "extra": "1653 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=memory+index/check_unbanned",
            "value": 43035,
            "unit": "ns/op\t     926 B/op\t      19 allocs/op",
            "extra": "7597 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=memory+index/check_unbanned - ns/op",
            "value": 43035,
            "unit": "ns/op",
            "extra": "7597 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=memory+index/check_unbanned - B/op",
            "value": 926,
            "unit": "B/op",
            "extra": "7597 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=memory+index/check_unbanned - allocs/op",
            "value": 19,
            "unit": "allocs/op",
            "extra": "7597 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=memory+index/check_banned",
            "value": 44911,
            "unit": "ns/op\t    1037 B/op\t      21 allocs/op",
            "extra": "7968 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=memory+index/check_banned - ns/op",
            "value": 44911,
            "unit": "ns/op",
            "extra": "7968 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=memory+index/check_banned - B/op",
            "value": 1037,
            "unit": "B/op",
            "extra": "7968 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=memory+index/check_banned - allocs/op",
            "value": 21,
            "unit": "allocs/op",
            "extra": "7968 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=memory+index/subjects_wildcard_minus",
            "value": 2177738,
            "unit": "ns/op\t 2719125 B/op\t     140 allocs/op",
            "extra": "156 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=memory+index/subjects_wildcard_minus - ns/op",
            "value": 2177738,
            "unit": "ns/op",
            "extra": "156 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=memory+index/subjects_wildcard_minus - B/op",
            "value": 2719125,
            "unit": "B/op",
            "extra": "156 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=memory+index/subjects_wildcard_minus - allocs/op",
            "value": 140,
            "unit": "allocs/op",
            "extra": "156 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=memory+index/lookup_banned",
            "value": 2351,
            "unit": "ns/op\t    1392 B/op\t      22 allocs/op",
            "extra": "171819 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=memory+index/lookup_banned - ns/op",
            "value": 2351,
            "unit": "ns/op",
            "extra": "171819 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=memory+index/lookup_banned - B/op",
            "value": 1392,
            "unit": "B/op",
            "extra": "171819 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=memory+index/lookup_banned - allocs/op",
            "value": 22,
            "unit": "allocs/op",
            "extra": "171819 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=memory+index/lookup_unbanned",
            "value": 2329,
            "unit": "ns/op\t    1392 B/op\t      22 allocs/op",
            "extra": "168907 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=memory+index/lookup_unbanned - ns/op",
            "value": 2329,
            "unit": "ns/op",
            "extra": "168907 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=memory+index/lookup_unbanned - B/op",
            "value": 1392,
            "unit": "B/op",
            "extra": "168907 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=memory+index/lookup_unbanned - allocs/op",
            "value": 22,
            "unit": "allocs/op",
            "extra": "168907 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres/check_unbanned",
            "value": 3081350,
            "unit": "ns/op\t 2841995 B/op\t   30081 allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres/check_unbanned - ns/op",
            "value": 3081350,
            "unit": "ns/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres/check_unbanned - B/op",
            "value": 2841995,
            "unit": "B/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres/check_unbanned - allocs/op",
            "value": 30081,
            "unit": "allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres/check_banned",
            "value": 3058831,
            "unit": "ns/op\t 2843080 B/op\t   30081 allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres/check_banned - ns/op",
            "value": 3058831,
            "unit": "ns/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres/check_banned - B/op",
            "value": 2843080,
            "unit": "B/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres/check_banned - allocs/op",
            "value": 30081,
            "unit": "allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres/subjects_wildcard_minus",
            "value": 4346703,
            "unit": "ns/op\t 3798448 B/op\t   30187 allocs/op",
            "extra": "93 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres/subjects_wildcard_minus - ns/op",
            "value": 4346703,
            "unit": "ns/op",
            "extra": "93 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres/subjects_wildcard_minus - B/op",
            "value": 3798448,
            "unit": "B/op",
            "extra": "93 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres/subjects_wildcard_minus - allocs/op",
            "value": 30187,
            "unit": "allocs/op",
            "extra": "93 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres/lookup_banned",
            "value": 600828,
            "unit": "ns/op\t    7168 B/op\t     113 allocs/op",
            "extra": "729 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres/lookup_banned - ns/op",
            "value": 600828,
            "unit": "ns/op",
            "extra": "729 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres/lookup_banned - B/op",
            "value": 7168,
            "unit": "B/op",
            "extra": "729 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres/lookup_banned - allocs/op",
            "value": 113,
            "unit": "allocs/op",
            "extra": "729 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres/lookup_unbanned",
            "value": 562009,
            "unit": "ns/op\t    6692 B/op\t     105 allocs/op",
            "extra": "596 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres/lookup_unbanned - ns/op",
            "value": 562009,
            "unit": "ns/op",
            "extra": "596 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres/lookup_unbanned - B/op",
            "value": 6692,
            "unit": "B/op",
            "extra": "596 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres/lookup_unbanned - allocs/op",
            "value": 105,
            "unit": "allocs/op",
            "extra": "596 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres+closure/check_unbanned",
            "value": 926654,
            "unit": "ns/op\t   10515 B/op\t     170 allocs/op",
            "extra": "387 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres+closure/check_unbanned - ns/op",
            "value": 926654,
            "unit": "ns/op",
            "extra": "387 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres+closure/check_unbanned - B/op",
            "value": 10515,
            "unit": "B/op",
            "extra": "387 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres+closure/check_unbanned - allocs/op",
            "value": 170,
            "unit": "allocs/op",
            "extra": "387 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres+closure/check_banned",
            "value": 892712,
            "unit": "ns/op\t   11153 B/op\t     177 allocs/op",
            "extra": "418 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres+closure/check_banned - ns/op",
            "value": 892712,
            "unit": "ns/op",
            "extra": "418 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres+closure/check_banned - B/op",
            "value": 11153,
            "unit": "B/op",
            "extra": "418 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres+closure/check_banned - allocs/op",
            "value": 177,
            "unit": "allocs/op",
            "extra": "418 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres+closure/subjects_wildcard_minus",
            "value": 16468147,
            "unit": "ns/op\t 3803266 B/op\t   30252 allocs/op",
            "extra": "20 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres+closure/subjects_wildcard_minus - ns/op",
            "value": 16468147,
            "unit": "ns/op",
            "extra": "20 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres+closure/subjects_wildcard_minus - B/op",
            "value": 3803266,
            "unit": "B/op",
            "extra": "20 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres+closure/subjects_wildcard_minus - allocs/op",
            "value": 30252,
            "unit": "allocs/op",
            "extra": "20 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres+closure/lookup_banned",
            "value": 786878,
            "unit": "ns/op\t    5089 B/op\t     113 allocs/op",
            "extra": "486 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres+closure/lookup_banned - ns/op",
            "value": 786878,
            "unit": "ns/op",
            "extra": "486 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres+closure/lookup_banned - B/op",
            "value": 5089,
            "unit": "B/op",
            "extra": "486 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres+closure/lookup_banned - allocs/op",
            "value": 113,
            "unit": "allocs/op",
            "extra": "486 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres+closure/lookup_unbanned",
            "value": 811884,
            "unit": "ns/op\t    5064 B/op\t     111 allocs/op",
            "extra": "476 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres+closure/lookup_unbanned - ns/op",
            "value": 811884,
            "unit": "ns/op",
            "extra": "476 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres+closure/lookup_unbanned - B/op",
            "value": 5064,
            "unit": "B/op",
            "extra": "476 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres+closure/lookup_unbanned - allocs/op",
            "value": 111,
            "unit": "allocs/op",
            "extra": "476 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres+sets/check_unbanned",
            "value": 941780,
            "unit": "ns/op\t   10507 B/op\t     170 allocs/op",
            "extra": "402 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres+sets/check_unbanned - ns/op",
            "value": 941780,
            "unit": "ns/op",
            "extra": "402 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres+sets/check_unbanned - B/op",
            "value": 10507,
            "unit": "B/op",
            "extra": "402 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres+sets/check_unbanned - allocs/op",
            "value": 170,
            "unit": "allocs/op",
            "extra": "402 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres+sets/check_banned",
            "value": 923142,
            "unit": "ns/op\t   10763 B/op\t     177 allocs/op",
            "extra": "456 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres+sets/check_banned - ns/op",
            "value": 923142,
            "unit": "ns/op",
            "extra": "456 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres+sets/check_banned - B/op",
            "value": 10763,
            "unit": "B/op",
            "extra": "456 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres+sets/check_banned - allocs/op",
            "value": 177,
            "unit": "allocs/op",
            "extra": "456 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres+sets/subjects_wildcard_minus",
            "value": 16349360,
            "unit": "ns/op\t 3803266 B/op\t   30252 allocs/op",
            "extra": "20 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres+sets/subjects_wildcard_minus - ns/op",
            "value": 16349360,
            "unit": "ns/op",
            "extra": "20 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres+sets/subjects_wildcard_minus - B/op",
            "value": 3803266,
            "unit": "B/op",
            "extra": "20 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres+sets/subjects_wildcard_minus - allocs/op",
            "value": 30252,
            "unit": "allocs/op",
            "extra": "20 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres+sets/lookup_banned",
            "value": 792423,
            "unit": "ns/op\t    5191 B/op\t     113 allocs/op",
            "extra": "441 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres+sets/lookup_banned - ns/op",
            "value": 792423,
            "unit": "ns/op",
            "extra": "441 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres+sets/lookup_banned - B/op",
            "value": 5191,
            "unit": "B/op",
            "extra": "441 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres+sets/lookup_banned - allocs/op",
            "value": 113,
            "unit": "allocs/op",
            "extra": "441 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres+sets/lookup_unbanned",
            "value": 746866,
            "unit": "ns/op\t    4901 B/op\t     111 allocs/op",
            "extra": "441 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres+sets/lookup_unbanned - ns/op",
            "value": 746866,
            "unit": "ns/op",
            "extra": "441 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres+sets/lookup_unbanned - B/op",
            "value": 4901,
            "unit": "B/op",
            "extra": "441 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=postgres+sets/lookup_unbanned - allocs/op",
            "value": 111,
            "unit": "allocs/op",
            "extra": "441 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=spicedb-memdb/check_unbanned",
            "value": 355079,
            "unit": "ns/op\t    7369 B/op\t     108 allocs/op",
            "extra": "1018 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=spicedb-memdb/check_unbanned - ns/op",
            "value": 355079,
            "unit": "ns/op",
            "extra": "1018 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=spicedb-memdb/check_unbanned - B/op",
            "value": 7369,
            "unit": "B/op",
            "extra": "1018 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=spicedb-memdb/check_unbanned - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "1018 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=spicedb-memdb/check_banned",
            "value": 323216,
            "unit": "ns/op\t    7370 B/op\t     108 allocs/op",
            "extra": "1005 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=spicedb-memdb/check_banned - ns/op",
            "value": 323216,
            "unit": "ns/op",
            "extra": "1005 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=spicedb-memdb/check_banned - B/op",
            "value": 7370,
            "unit": "B/op",
            "extra": "1005 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=spicedb-memdb/check_banned - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "1005 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=spicedb-memdb/subjects_wildcard_minus",
            "value": 3237443,
            "unit": "ns/op\t 1159826 B/op\t   15161 allocs/op",
            "extra": "122 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=spicedb-memdb/subjects_wildcard_minus - ns/op",
            "value": 3237443,
            "unit": "ns/op",
            "extra": "122 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=spicedb-memdb/subjects_wildcard_minus - B/op",
            "value": 1159826,
            "unit": "B/op",
            "extra": "122 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=spicedb-memdb/subjects_wildcard_minus - allocs/op",
            "value": 15161,
            "unit": "allocs/op",
            "extra": "122 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=spicedb-memdb/lookup_banned",
            "value": 320675,
            "unit": "ns/op\t    6338 B/op\t      91 allocs/op",
            "extra": "1102 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=spicedb-memdb/lookup_banned - ns/op",
            "value": 320675,
            "unit": "ns/op",
            "extra": "1102 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=spicedb-memdb/lookup_banned - B/op",
            "value": 6338,
            "unit": "B/op",
            "extra": "1102 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=spicedb-memdb/lookup_banned - allocs/op",
            "value": 91,
            "unit": "allocs/op",
            "extra": "1102 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=spicedb-memdb/lookup_unbanned",
            "value": 349041,
            "unit": "ns/op\t    7832 B/op\t     113 allocs/op",
            "extra": "996 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=spicedb-memdb/lookup_unbanned - ns/op",
            "value": 349041,
            "unit": "ns/op",
            "extra": "996 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=spicedb-memdb/lookup_unbanned - B/op",
            "value": 7832,
            "unit": "B/op",
            "extra": "996 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=spicedb-memdb/lookup_unbanned - allocs/op",
            "value": 113,
            "unit": "allocs/op",
            "extra": "996 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=spicedb-postgres/check_unbanned",
            "value": 587139,
            "unit": "ns/op\t    7354 B/op\t     108 allocs/op",
            "extra": "592 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=spicedb-postgres/check_unbanned - ns/op",
            "value": 587139,
            "unit": "ns/op",
            "extra": "592 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=spicedb-postgres/check_unbanned - B/op",
            "value": 7354,
            "unit": "B/op",
            "extra": "592 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=spicedb-postgres/check_unbanned - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "592 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=spicedb-postgres/check_banned",
            "value": 598358,
            "unit": "ns/op\t    7297 B/op\t     108 allocs/op",
            "extra": "590 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=spicedb-postgres/check_banned - ns/op",
            "value": 598358,
            "unit": "ns/op",
            "extra": "590 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=spicedb-postgres/check_banned - B/op",
            "value": 7297,
            "unit": "B/op",
            "extra": "590 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=spicedb-postgres/check_banned - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "590 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=spicedb-postgres/subjects_wildcard_minus",
            "value": 3044830,
            "unit": "ns/op\t 1098640 B/op\t   15160 allocs/op",
            "extra": "112 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=spicedb-postgres/subjects_wildcard_minus - ns/op",
            "value": 3044830,
            "unit": "ns/op",
            "extra": "112 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=spicedb-postgres/subjects_wildcard_minus - B/op",
            "value": 1098640,
            "unit": "B/op",
            "extra": "112 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=spicedb-postgres/subjects_wildcard_minus - allocs/op",
            "value": 15160,
            "unit": "allocs/op",
            "extra": "112 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=spicedb-postgres/lookup_banned",
            "value": 579301,
            "unit": "ns/op\t    6338 B/op\t      91 allocs/op",
            "extra": "580 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=spicedb-postgres/lookup_banned - ns/op",
            "value": 579301,
            "unit": "ns/op",
            "extra": "580 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=spicedb-postgres/lookup_banned - B/op",
            "value": 6338,
            "unit": "B/op",
            "extra": "580 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=spicedb-postgres/lookup_banned - allocs/op",
            "value": 91,
            "unit": "allocs/op",
            "extra": "580 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=spicedb-postgres/lookup_unbanned",
            "value": 602041,
            "unit": "ns/op\t    7760 B/op\t     113 allocs/op",
            "extra": "562 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=spicedb-postgres/lookup_unbanned - ns/op",
            "value": 602041,
            "unit": "ns/op",
            "extra": "562 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=spicedb-postgres/lookup_unbanned - B/op",
            "value": 7760,
            "unit": "B/op",
            "extra": "562 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/pattern/name=wildcard_ban/kind=spicedb-postgres/lookup_unbanned - allocs/op",
            "value": 113,
            "unit": "allocs/op",
            "extra": "562 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory/lookup",
            "value": 907898,
            "unit": "ns/op\t  174158 B/op\t     164 allocs/op",
            "extra": "441 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory/lookup - ns/op",
            "value": 907898,
            "unit": "ns/op",
            "extra": "441 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory/lookup - B/op",
            "value": 174158,
            "unit": "B/op",
            "extra": "441 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory/lookup - allocs/op",
            "value": 164,
            "unit": "allocs/op",
            "extra": "441 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory/check_hit",
            "value": 44974,
            "unit": "ns/op\t    1854 B/op\t      17 allocs/op",
            "extra": "7616 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory/check_hit - ns/op",
            "value": 44974,
            "unit": "ns/op",
            "extra": "7616 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory/check_hit - B/op",
            "value": 1854,
            "unit": "B/op",
            "extra": "7616 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory/check_hit - allocs/op",
            "value": 17,
            "unit": "allocs/op",
            "extra": "7616 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory/check_miss",
            "value": 86339,
            "unit": "ns/op\t    1922 B/op\t      20 allocs/op",
            "extra": "4033 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory/check_miss - ns/op",
            "value": 86339,
            "unit": "ns/op",
            "extra": "4033 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory/check_miss - B/op",
            "value": 1922,
            "unit": "B/op",
            "extra": "4033 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory/check_miss - allocs/op",
            "value": 20,
            "unit": "allocs/op",
            "extra": "4033 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory/bulk_100",
            "value": 960903,
            "unit": "ns/op\t  319769 B/op\t    1337 allocs/op",
            "extra": "362 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory/bulk_100 - ns/op",
            "value": 960903,
            "unit": "ns/op",
            "extra": "362 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory/bulk_100 - B/op",
            "value": 319769,
            "unit": "B/op",
            "extra": "362 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory/bulk_100 - allocs/op",
            "value": 1337,
            "unit": "allocs/op",
            "extra": "362 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory/subjects_one",
            "value": 87809,
            "unit": "ns/op\t    3024 B/op\t      32 allocs/op",
            "extra": "3799 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory/subjects_one - ns/op",
            "value": 87809,
            "unit": "ns/op",
            "extra": "3799 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory/subjects_one - B/op",
            "value": 3024,
            "unit": "B/op",
            "extra": "3799 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory/subjects_one - allocs/op",
            "value": 32,
            "unit": "allocs/op",
            "extra": "3799 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory/toggle_grant",
            "value": 413477,
            "unit": "ns/op\t  984788 B/op\t      29 allocs/op",
            "extra": "819 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory/toggle_grant - ns/op",
            "value": 413477,
            "unit": "ns/op",
            "extra": "819 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory/toggle_grant - B/op",
            "value": 984788,
            "unit": "B/op",
            "extra": "819 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory/toggle_grant - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "819 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory+index/lookup",
            "value": 38358,
            "unit": "ns/op\t   33852 B/op\t      40 allocs/op",
            "extra": "8827 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory+index/lookup - ns/op",
            "value": 38358,
            "unit": "ns/op",
            "extra": "8827 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory+index/lookup - B/op",
            "value": 33852,
            "unit": "B/op",
            "extra": "8827 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory+index/lookup - allocs/op",
            "value": 40,
            "unit": "allocs/op",
            "extra": "8827 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory+index/check_hit",
            "value": 1581,
            "unit": "ns/op\t     921 B/op\t      10 allocs/op",
            "extra": "242719 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory+index/check_hit - ns/op",
            "value": 1581,
            "unit": "ns/op",
            "extra": "242719 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory+index/check_hit - B/op",
            "value": 921,
            "unit": "B/op",
            "extra": "242719 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory+index/check_hit - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "242719 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory+index/check_miss",
            "value": 1593,
            "unit": "ns/op\t     921 B/op\t      10 allocs/op",
            "extra": "233205 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory+index/check_miss - ns/op",
            "value": 1593,
            "unit": "ns/op",
            "extra": "233205 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory+index/check_miss - B/op",
            "value": 921,
            "unit": "B/op",
            "extra": "233205 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory+index/check_miss - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "233205 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory+index/bulk_100",
            "value": 182461,
            "unit": "ns/op\t   93788 B/op\t     326 allocs/op",
            "extra": "2209 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory+index/bulk_100 - ns/op",
            "value": 182461,
            "unit": "ns/op",
            "extra": "2209 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory+index/bulk_100 - B/op",
            "value": 93788,
            "unit": "B/op",
            "extra": "2209 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory+index/bulk_100 - allocs/op",
            "value": 326,
            "unit": "allocs/op",
            "extra": "2209 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory+index/subjects_one",
            "value": 2182,
            "unit": "ns/op\t    1704 B/op\t      18 allocs/op",
            "extra": "193875 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory+index/subjects_one - ns/op",
            "value": 2182,
            "unit": "ns/op",
            "extra": "193875 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory+index/subjects_one - B/op",
            "value": 1704,
            "unit": "B/op",
            "extra": "193875 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory+index/subjects_one - allocs/op",
            "value": 18,
            "unit": "allocs/op",
            "extra": "193875 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory+index/toggle_grant",
            "value": 404693,
            "unit": "ns/op\t  984712 B/op\t      29 allocs/op",
            "extra": "1180 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory+index/toggle_grant - ns/op",
            "value": 404693,
            "unit": "ns/op",
            "extra": "1180 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory+index/toggle_grant - B/op",
            "value": 984712,
            "unit": "B/op",
            "extra": "1180 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=memory+index/toggle_grant - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "1180 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres/lookup",
            "value": 2113141,
            "unit": "ns/op\t  280375 B/op\t    3251 allocs/op",
            "extra": "163 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres/lookup - ns/op",
            "value": 2113141,
            "unit": "ns/op",
            "extra": "163 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres/lookup - B/op",
            "value": 280375,
            "unit": "B/op",
            "extra": "163 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres/lookup - allocs/op",
            "value": 3251,
            "unit": "allocs/op",
            "extra": "163 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres/check_hit",
            "value": 306225,
            "unit": "ns/op\t    4048 B/op\t      67 allocs/op",
            "extra": "1432 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres/check_hit - ns/op",
            "value": 306225,
            "unit": "ns/op",
            "extra": "1432 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres/check_hit - B/op",
            "value": 4048,
            "unit": "B/op",
            "extra": "1432 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres/check_hit - allocs/op",
            "value": 67,
            "unit": "allocs/op",
            "extra": "1432 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres/check_miss",
            "value": 455530,
            "unit": "ns/op\t    4994 B/op\t      81 allocs/op",
            "extra": "943 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres/check_miss - ns/op",
            "value": 455530,
            "unit": "ns/op",
            "extra": "943 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres/check_miss - B/op",
            "value": 4994,
            "unit": "B/op",
            "extra": "943 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres/check_miss - allocs/op",
            "value": 81,
            "unit": "allocs/op",
            "extra": "943 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres/bulk_100",
            "value": 1780141,
            "unit": "ns/op\t  396835 B/op\t    3753 allocs/op",
            "extra": "205 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres/bulk_100 - ns/op",
            "value": 1780141,
            "unit": "ns/op",
            "extra": "205 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres/bulk_100 - B/op",
            "value": 396835,
            "unit": "B/op",
            "extra": "205 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres/bulk_100 - allocs/op",
            "value": 3753,
            "unit": "allocs/op",
            "extra": "205 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres/subjects_one",
            "value": 454552,
            "unit": "ns/op\t    6027 B/op\t      93 allocs/op",
            "extra": "910 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres/subjects_one - ns/op",
            "value": 454552,
            "unit": "ns/op",
            "extra": "910 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres/subjects_one - B/op",
            "value": 6027,
            "unit": "B/op",
            "extra": "910 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres/subjects_one - allocs/op",
            "value": 93,
            "unit": "allocs/op",
            "extra": "910 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres/toggle_grant",
            "value": 5999119,
            "unit": "ns/op\t   11428 B/op\t     144 allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres/toggle_grant - ns/op",
            "value": 5999119,
            "unit": "ns/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres/toggle_grant - B/op",
            "value": 11428,
            "unit": "B/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres/toggle_grant - allocs/op",
            "value": 144,
            "unit": "allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+closure/lookup",
            "value": 1019509,
            "unit": "ns/op\t   28356 B/op\t     438 allocs/op",
            "extra": "358 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+closure/lookup - ns/op",
            "value": 1019509,
            "unit": "ns/op",
            "extra": "358 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+closure/lookup - B/op",
            "value": 28356,
            "unit": "B/op",
            "extra": "358 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+closure/lookup - allocs/op",
            "value": 438,
            "unit": "allocs/op",
            "extra": "358 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+closure/check_hit",
            "value": 604785,
            "unit": "ns/op\t    5896 B/op\t      97 allocs/op",
            "extra": "664 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+closure/check_hit - ns/op",
            "value": 604785,
            "unit": "ns/op",
            "extra": "664 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+closure/check_hit - B/op",
            "value": 5896,
            "unit": "B/op",
            "extra": "664 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+closure/check_hit - allocs/op",
            "value": 97,
            "unit": "allocs/op",
            "extra": "664 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+closure/check_miss",
            "value": 1000696,
            "unit": "ns/op\t    9990 B/op\t     162 allocs/op",
            "extra": "396 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+closure/check_miss - ns/op",
            "value": 1000696,
            "unit": "ns/op",
            "extra": "396 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+closure/check_miss - B/op",
            "value": 9990,
            "unit": "B/op",
            "extra": "396 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+closure/check_miss - allocs/op",
            "value": 162,
            "unit": "allocs/op",
            "extra": "396 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+closure/bulk_100",
            "value": 2649819,
            "unit": "ns/op\t  168938 B/op\t    1635 allocs/op",
            "extra": "132 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+closure/bulk_100 - ns/op",
            "value": 2649819,
            "unit": "ns/op",
            "extra": "132 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+closure/bulk_100 - B/op",
            "value": 168938,
            "unit": "B/op",
            "extra": "132 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+closure/bulk_100 - allocs/op",
            "value": 1635,
            "unit": "allocs/op",
            "extra": "132 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+closure/subjects_one",
            "value": 971761,
            "unit": "ns/op\t    9139 B/op\t     158 allocs/op",
            "extra": "373 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+closure/subjects_one - ns/op",
            "value": 971761,
            "unit": "ns/op",
            "extra": "373 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+closure/subjects_one - B/op",
            "value": 9139,
            "unit": "B/op",
            "extra": "373 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+closure/subjects_one - allocs/op",
            "value": 158,
            "unit": "allocs/op",
            "extra": "373 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+closure/toggle_grant",
            "value": 6118774,
            "unit": "ns/op\t   11516 B/op\t     144 allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+closure/toggle_grant - ns/op",
            "value": 6118774,
            "unit": "ns/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+closure/toggle_grant - B/op",
            "value": 11516,
            "unit": "B/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+closure/toggle_grant - allocs/op",
            "value": 144,
            "unit": "allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+sets/lookup",
            "value": 870261,
            "unit": "ns/op\t   19912 B/op\t     392 allocs/op",
            "extra": "402 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+sets/lookup - ns/op",
            "value": 870261,
            "unit": "ns/op",
            "extra": "402 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+sets/lookup - B/op",
            "value": 19912,
            "unit": "B/op",
            "extra": "402 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+sets/lookup - allocs/op",
            "value": 392,
            "unit": "allocs/op",
            "extra": "402 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+sets/check_hit",
            "value": 933382,
            "unit": "ns/op\t    6063 B/op\t      77 allocs/op",
            "extra": "406 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+sets/check_hit - ns/op",
            "value": 933382,
            "unit": "ns/op",
            "extra": "406 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+sets/check_hit - B/op",
            "value": 6063,
            "unit": "B/op",
            "extra": "406 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+sets/check_hit - allocs/op",
            "value": 77,
            "unit": "allocs/op",
            "extra": "406 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+sets/check_miss",
            "value": 928865,
            "unit": "ns/op\t    5856 B/op\t      77 allocs/op",
            "extra": "385 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+sets/check_miss - ns/op",
            "value": 928865,
            "unit": "ns/op",
            "extra": "385 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+sets/check_miss - B/op",
            "value": 5856,
            "unit": "B/op",
            "extra": "385 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+sets/check_miss - allocs/op",
            "value": 77,
            "unit": "allocs/op",
            "extra": "385 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+sets/bulk_100",
            "value": 2236375,
            "unit": "ns/op\t   69314 B/op\t     907 allocs/op",
            "extra": "162 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+sets/bulk_100 - ns/op",
            "value": 2236375,
            "unit": "ns/op",
            "extra": "162 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+sets/bulk_100 - B/op",
            "value": 69314,
            "unit": "B/op",
            "extra": "162 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+sets/bulk_100 - allocs/op",
            "value": 907,
            "unit": "allocs/op",
            "extra": "162 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+sets/subjects_one",
            "value": 564656,
            "unit": "ns/op\t    3941 B/op\t      82 allocs/op",
            "extra": "608 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+sets/subjects_one - ns/op",
            "value": 564656,
            "unit": "ns/op",
            "extra": "608 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+sets/subjects_one - B/op",
            "value": 3941,
            "unit": "B/op",
            "extra": "608 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+sets/subjects_one - allocs/op",
            "value": 82,
            "unit": "allocs/op",
            "extra": "608 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+sets/toggle_grant",
            "value": 24084288,
            "unit": "ns/op\t   23030 B/op\t     331 allocs/op",
            "extra": "84 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+sets/toggle_grant - ns/op",
            "value": 24084288,
            "unit": "ns/op",
            "extra": "84 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+sets/toggle_grant - B/op",
            "value": 23030,
            "unit": "B/op",
            "extra": "84 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=postgres+sets/toggle_grant - allocs/op",
            "value": 331,
            "unit": "allocs/op",
            "extra": "84 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-memdb/lookup",
            "value": 909137,
            "unit": "ns/op\t   92383 B/op\t    1149 allocs/op",
            "extra": "408 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-memdb/lookup - ns/op",
            "value": 909137,
            "unit": "ns/op",
            "extra": "408 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-memdb/lookup - B/op",
            "value": 92383,
            "unit": "B/op",
            "extra": "408 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-memdb/lookup - allocs/op",
            "value": 1149,
            "unit": "allocs/op",
            "extra": "408 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-memdb/check_hit",
            "value": 338977,
            "unit": "ns/op\t    7369 B/op\t     108 allocs/op",
            "extra": "993 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-memdb/check_hit - ns/op",
            "value": 338977,
            "unit": "ns/op",
            "extra": "993 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-memdb/check_hit - B/op",
            "value": 7369,
            "unit": "B/op",
            "extra": "993 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-memdb/check_hit - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "993 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-memdb/check_miss",
            "value": 333133,
            "unit": "ns/op\t    7399 B/op\t     108 allocs/op",
            "extra": "1044 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-memdb/check_miss - ns/op",
            "value": 333133,
            "unit": "ns/op",
            "extra": "1044 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-memdb/check_miss - B/op",
            "value": 7399,
            "unit": "B/op",
            "extra": "1044 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-memdb/check_miss - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "1044 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-memdb/bulk_100",
            "value": 1241491,
            "unit": "ns/op\t   99301 B/op\t    1711 allocs/op",
            "extra": "314 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-memdb/bulk_100 - ns/op",
            "value": 1241491,
            "unit": "ns/op",
            "extra": "314 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-memdb/bulk_100 - B/op",
            "value": 99301,
            "unit": "B/op",
            "extra": "314 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-memdb/bulk_100 - allocs/op",
            "value": 1711,
            "unit": "allocs/op",
            "extra": "314 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-memdb/subjects_one",
            "value": 360187,
            "unit": "ns/op\t    8975 B/op\t     139 allocs/op",
            "extra": "928 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-memdb/subjects_one - ns/op",
            "value": 360187,
            "unit": "ns/op",
            "extra": "928 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-memdb/subjects_one - B/op",
            "value": 8975,
            "unit": "B/op",
            "extra": "928 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-memdb/subjects_one - allocs/op",
            "value": 139,
            "unit": "allocs/op",
            "extra": "928 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-memdb/toggle_grant",
            "value": 841796,
            "unit": "ns/op\t   15311 B/op\t     225 allocs/op",
            "extra": "448 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-memdb/toggle_grant - ns/op",
            "value": 841796,
            "unit": "ns/op",
            "extra": "448 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-memdb/toggle_grant - B/op",
            "value": 15311,
            "unit": "B/op",
            "extra": "448 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-memdb/toggle_grant - allocs/op",
            "value": 225,
            "unit": "allocs/op",
            "extra": "448 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-postgres/lookup",
            "value": 1220828,
            "unit": "ns/op\t   81775 B/op\t    1151 allocs/op",
            "extra": "273 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-postgres/lookup - ns/op",
            "value": 1220828,
            "unit": "ns/op",
            "extra": "273 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-postgres/lookup - B/op",
            "value": 81775,
            "unit": "B/op",
            "extra": "273 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-postgres/lookup - allocs/op",
            "value": 1151,
            "unit": "allocs/op",
            "extra": "273 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-postgres/check_hit",
            "value": 635193,
            "unit": "ns/op\t    7421 B/op\t     108 allocs/op",
            "extra": "541 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-postgres/check_hit - ns/op",
            "value": 635193,
            "unit": "ns/op",
            "extra": "541 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-postgres/check_hit - B/op",
            "value": 7421,
            "unit": "B/op",
            "extra": "541 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-postgres/check_hit - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "541 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-postgres/check_miss",
            "value": 644236,
            "unit": "ns/op\t    7358 B/op\t     108 allocs/op",
            "extra": "553 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-postgres/check_miss - ns/op",
            "value": 644236,
            "unit": "ns/op",
            "extra": "553 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-postgres/check_miss - B/op",
            "value": 7358,
            "unit": "B/op",
            "extra": "553 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-postgres/check_miss - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "553 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-postgres/bulk_100",
            "value": 1573898,
            "unit": "ns/op\t   99468 B/op\t    1711 allocs/op",
            "extra": "228 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-postgres/bulk_100 - ns/op",
            "value": 1573898,
            "unit": "ns/op",
            "extra": "228 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-postgres/bulk_100 - B/op",
            "value": 99468,
            "unit": "B/op",
            "extra": "228 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-postgres/bulk_100 - allocs/op",
            "value": 1711,
            "unit": "allocs/op",
            "extra": "228 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-postgres/subjects_one",
            "value": 648455,
            "unit": "ns/op\t    8881 B/op\t     138 allocs/op",
            "extra": "520 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-postgres/subjects_one - ns/op",
            "value": 648455,
            "unit": "ns/op",
            "extra": "520 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-postgres/subjects_one - B/op",
            "value": 8881,
            "unit": "B/op",
            "extra": "520 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-postgres/subjects_one - allocs/op",
            "value": 138,
            "unit": "allocs/op",
            "extra": "520 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-postgres/toggle_grant",
            "value": 11564630,
            "unit": "ns/op\t   15635 B/op\t     226 allocs/op",
            "extra": "80 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-postgres/toggle_grant - ns/op",
            "value": 11564630,
            "unit": "ns/op",
            "extra": "80 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-postgres/toggle_grant - B/op",
            "value": 15635,
            "unit": "B/op",
            "extra": "80 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=direct/kind=spicedb-postgres/toggle_grant - allocs/op",
            "value": 226,
            "unit": "allocs/op",
            "extra": "80 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory/lookup",
            "value": 5470219,
            "unit": "ns/op\t 1620826 B/op\t     242 allocs/op",
            "extra": "66 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory/lookup - ns/op",
            "value": 5470219,
            "unit": "ns/op",
            "extra": "66 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory/lookup - B/op",
            "value": 1620826,
            "unit": "B/op",
            "extra": "66 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory/lookup - allocs/op",
            "value": 242,
            "unit": "allocs/op",
            "extra": "66 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory/check_hit",
            "value": 62113,
            "unit": "ns/op\t    1855 B/op\t      17 allocs/op",
            "extra": "5613 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory/check_hit - ns/op",
            "value": 62113,
            "unit": "ns/op",
            "extra": "5613 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory/check_hit - B/op",
            "value": 1855,
            "unit": "B/op",
            "extra": "5613 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory/check_hit - allocs/op",
            "value": 17,
            "unit": "allocs/op",
            "extra": "5613 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory/check_miss",
            "value": 120813,
            "unit": "ns/op\t    1913 B/op\t      20 allocs/op",
            "extra": "2956 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory/check_miss - ns/op",
            "value": 120813,
            "unit": "ns/op",
            "extra": "2956 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory/check_miss - B/op",
            "value": 1913,
            "unit": "B/op",
            "extra": "2956 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory/check_miss - allocs/op",
            "value": 20,
            "unit": "allocs/op",
            "extra": "2956 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory/bulk_100",
            "value": 1129584,
            "unit": "ns/op\t  423459 B/op\t    1471 allocs/op",
            "extra": "324 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory/bulk_100 - ns/op",
            "value": 1129584,
            "unit": "ns/op",
            "extra": "324 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory/bulk_100 - B/op",
            "value": 423459,
            "unit": "B/op",
            "extra": "324 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory/bulk_100 - allocs/op",
            "value": 1471,
            "unit": "allocs/op",
            "extra": "324 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory/subjects_one",
            "value": 123108,
            "unit": "ns/op\t    3050 B/op\t      32 allocs/op",
            "extra": "2821 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory/subjects_one - ns/op",
            "value": 123108,
            "unit": "ns/op",
            "extra": "2821 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory/subjects_one - B/op",
            "value": 3050,
            "unit": "B/op",
            "extra": "2821 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory/subjects_one - allocs/op",
            "value": 32,
            "unit": "allocs/op",
            "extra": "2821 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory/toggle_grant",
            "value": 784552,
            "unit": "ns/op\t 1968365 B/op\t      45 allocs/op",
            "extra": "460 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory/toggle_grant - ns/op",
            "value": 784552,
            "unit": "ns/op",
            "extra": "460 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory/toggle_grant - B/op",
            "value": 1968365,
            "unit": "B/op",
            "extra": "460 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory/toggle_grant - allocs/op",
            "value": 45,
            "unit": "allocs/op",
            "extra": "460 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory+index/lookup",
            "value": 485775,
            "unit": "ns/op\t  513358 B/op\t      73 allocs/op",
            "extra": "838 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory+index/lookup - ns/op",
            "value": 485775,
            "unit": "ns/op",
            "extra": "838 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory+index/lookup - B/op",
            "value": 513358,
            "unit": "B/op",
            "extra": "838 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory+index/lookup - allocs/op",
            "value": 73,
            "unit": "allocs/op",
            "extra": "838 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory+index/check_hit",
            "value": 1609,
            "unit": "ns/op\t     921 B/op\t      10 allocs/op",
            "extra": "246600 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory+index/check_hit - ns/op",
            "value": 1609,
            "unit": "ns/op",
            "extra": "246600 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory+index/check_hit - B/op",
            "value": 921,
            "unit": "B/op",
            "extra": "246600 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory+index/check_hit - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "246600 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory+index/check_miss",
            "value": 1626,
            "unit": "ns/op\t     921 B/op\t      10 allocs/op",
            "extra": "206644 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory+index/check_miss - ns/op",
            "value": 1626,
            "unit": "ns/op",
            "extra": "206644 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory+index/check_miss - B/op",
            "value": 921,
            "unit": "B/op",
            "extra": "206644 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory+index/check_miss - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "206644 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory+index/bulk_100",
            "value": 560673,
            "unit": "ns/op\t  640722 B/op\t     471 allocs/op",
            "extra": "734 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory+index/bulk_100 - ns/op",
            "value": 560673,
            "unit": "ns/op",
            "extra": "734 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory+index/bulk_100 - B/op",
            "value": 640722,
            "unit": "B/op",
            "extra": "734 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory+index/bulk_100 - allocs/op",
            "value": 471,
            "unit": "allocs/op",
            "extra": "734 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory+index/subjects_one",
            "value": 2251,
            "unit": "ns/op\t    1704 B/op\t      18 allocs/op",
            "extra": "193030 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory+index/subjects_one - ns/op",
            "value": 2251,
            "unit": "ns/op",
            "extra": "193030 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory+index/subjects_one - B/op",
            "value": 1704,
            "unit": "B/op",
            "extra": "193030 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory+index/subjects_one - allocs/op",
            "value": 18,
            "unit": "allocs/op",
            "extra": "193030 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory+index/toggle_grant",
            "value": 835635,
            "unit": "ns/op\t 1967967 B/op\t      45 allocs/op",
            "extra": "375 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory+index/toggle_grant - ns/op",
            "value": 835635,
            "unit": "ns/op",
            "extra": "375 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory+index/toggle_grant - B/op",
            "value": 1967967,
            "unit": "B/op",
            "extra": "375 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=memory+index/toggle_grant - allocs/op",
            "value": 45,
            "unit": "allocs/op",
            "extra": "375 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres/lookup",
            "value": 6283202,
            "unit": "ns/op\t 2434249 B/op\t   25589 allocs/op",
            "extra": "55 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres/lookup - ns/op",
            "value": 6283202,
            "unit": "ns/op",
            "extra": "55 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres/lookup - B/op",
            "value": 2434249,
            "unit": "B/op",
            "extra": "55 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres/lookup - allocs/op",
            "value": 25589,
            "unit": "allocs/op",
            "extra": "55 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres/check_hit",
            "value": 307928,
            "unit": "ns/op\t    4079 B/op\t      67 allocs/op",
            "extra": "1316 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres/check_hit - ns/op",
            "value": 307928,
            "unit": "ns/op",
            "extra": "1316 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres/check_hit - B/op",
            "value": 4079,
            "unit": "B/op",
            "extra": "1316 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres/check_hit - allocs/op",
            "value": 67,
            "unit": "allocs/op",
            "extra": "1316 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres/check_miss",
            "value": 464586,
            "unit": "ns/op\t    4952 B/op\t      81 allocs/op",
            "extra": "1009 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres/check_miss - ns/op",
            "value": 464586,
            "unit": "ns/op",
            "extra": "1009 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres/check_miss - B/op",
            "value": 4952,
            "unit": "B/op",
            "extra": "1009 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres/check_miss - allocs/op",
            "value": 81,
            "unit": "allocs/op",
            "extra": "1009 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres/bulk_100",
            "value": 1825319,
            "unit": "ns/op\t  513635 B/op\t    4334 allocs/op",
            "extra": "204 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres/bulk_100 - ns/op",
            "value": 1825319,
            "unit": "ns/op",
            "extra": "204 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres/bulk_100 - B/op",
            "value": 513635,
            "unit": "B/op",
            "extra": "204 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres/bulk_100 - allocs/op",
            "value": 4334,
            "unit": "allocs/op",
            "extra": "204 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres/subjects_one",
            "value": 428866,
            "unit": "ns/op\t    6183 B/op\t      93 allocs/op",
            "extra": "728 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres/subjects_one - ns/op",
            "value": 428866,
            "unit": "ns/op",
            "extra": "728 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres/subjects_one - B/op",
            "value": 6183,
            "unit": "B/op",
            "extra": "728 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres/subjects_one - allocs/op",
            "value": 93,
            "unit": "allocs/op",
            "extra": "728 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres/toggle_grant",
            "value": 29168076,
            "unit": "ns/op\t   13036 B/op\t     144 allocs/op",
            "extra": "26 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres/toggle_grant - ns/op",
            "value": 29168076,
            "unit": "ns/op",
            "extra": "26 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres/toggle_grant - B/op",
            "value": 13036,
            "unit": "B/op",
            "extra": "26 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres/toggle_grant - allocs/op",
            "value": 144,
            "unit": "allocs/op",
            "extra": "26 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+closure/lookup",
            "value": 1995461,
            "unit": "ns/op\t  306648 B/op\t    2848 allocs/op",
            "extra": "175 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+closure/lookup - ns/op",
            "value": 1995461,
            "unit": "ns/op",
            "extra": "175 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+closure/lookup - B/op",
            "value": 306648,
            "unit": "B/op",
            "extra": "175 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+closure/lookup - allocs/op",
            "value": 2848,
            "unit": "allocs/op",
            "extra": "175 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+closure/check_hit",
            "value": 609743,
            "unit": "ns/op\t    5775 B/op\t      97 allocs/op",
            "extra": "625 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+closure/check_hit - ns/op",
            "value": 609743,
            "unit": "ns/op",
            "extra": "625 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+closure/check_hit - B/op",
            "value": 5775,
            "unit": "B/op",
            "extra": "625 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+closure/check_hit - allocs/op",
            "value": 97,
            "unit": "allocs/op",
            "extra": "625 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+closure/check_miss",
            "value": 997010,
            "unit": "ns/op\t    9785 B/op\t     162 allocs/op",
            "extra": "392 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+closure/check_miss - ns/op",
            "value": 997010,
            "unit": "ns/op",
            "extra": "392 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+closure/check_miss - B/op",
            "value": 9785,
            "unit": "B/op",
            "extra": "392 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+closure/check_miss - allocs/op",
            "value": 162,
            "unit": "allocs/op",
            "extra": "392 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+closure/bulk_100",
            "value": 2676364,
            "unit": "ns/op\t  223661 B/op\t    2147 allocs/op",
            "extra": "134 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+closure/bulk_100 - ns/op",
            "value": 2676364,
            "unit": "ns/op",
            "extra": "134 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+closure/bulk_100 - B/op",
            "value": 223661,
            "unit": "B/op",
            "extra": "134 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+closure/bulk_100 - allocs/op",
            "value": 2147,
            "unit": "allocs/op",
            "extra": "134 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+closure/subjects_one",
            "value": 942690,
            "unit": "ns/op\t    9137 B/op\t     158 allocs/op",
            "extra": "394 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+closure/subjects_one - ns/op",
            "value": 942690,
            "unit": "ns/op",
            "extra": "394 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+closure/subjects_one - B/op",
            "value": 9137,
            "unit": "B/op",
            "extra": "394 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+closure/subjects_one - allocs/op",
            "value": 158,
            "unit": "allocs/op",
            "extra": "394 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+closure/toggle_grant",
            "value": 7602788,
            "unit": "ns/op\t   10682 B/op\t     144 allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+closure/toggle_grant - ns/op",
            "value": 7602788,
            "unit": "ns/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+closure/toggle_grant - B/op",
            "value": 10682,
            "unit": "B/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+closure/toggle_grant - allocs/op",
            "value": 144,
            "unit": "allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+sets/lookup",
            "value": 1978140,
            "unit": "ns/op\t  196364 B/op\t    2791 allocs/op",
            "extra": "184 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+sets/lookup - ns/op",
            "value": 1978140,
            "unit": "ns/op",
            "extra": "184 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+sets/lookup - B/op",
            "value": 196364,
            "unit": "B/op",
            "extra": "184 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+sets/lookup - allocs/op",
            "value": 2791,
            "unit": "allocs/op",
            "extra": "184 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+sets/check_hit",
            "value": 898475,
            "unit": "ns/op\t    5857 B/op\t      77 allocs/op",
            "extra": "380 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+sets/check_hit - ns/op",
            "value": 898475,
            "unit": "ns/op",
            "extra": "380 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+sets/check_hit - B/op",
            "value": 5857,
            "unit": "B/op",
            "extra": "380 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+sets/check_hit - allocs/op",
            "value": 77,
            "unit": "allocs/op",
            "extra": "380 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+sets/check_miss",
            "value": 867984,
            "unit": "ns/op\t    6066 B/op\t      77 allocs/op",
            "extra": "400 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+sets/check_miss - ns/op",
            "value": 867984,
            "unit": "ns/op",
            "extra": "400 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+sets/check_miss - B/op",
            "value": 6066,
            "unit": "B/op",
            "extra": "400 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+sets/check_miss - allocs/op",
            "value": 77,
            "unit": "allocs/op",
            "extra": "400 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+sets/bulk_100",
            "value": 2701190,
            "unit": "ns/op\t  121773 B/op\t    1474 allocs/op",
            "extra": "132 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+sets/bulk_100 - ns/op",
            "value": 2701190,
            "unit": "ns/op",
            "extra": "132 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+sets/bulk_100 - B/op",
            "value": 121773,
            "unit": "B/op",
            "extra": "132 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+sets/bulk_100 - allocs/op",
            "value": 1474,
            "unit": "allocs/op",
            "extra": "132 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+sets/subjects_one",
            "value": 580353,
            "unit": "ns/op\t    3918 B/op\t      82 allocs/op",
            "extra": "660 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+sets/subjects_one - ns/op",
            "value": 580353,
            "unit": "ns/op",
            "extra": "660 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+sets/subjects_one - B/op",
            "value": 3918,
            "unit": "B/op",
            "extra": "660 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+sets/subjects_one - allocs/op",
            "value": 82,
            "unit": "allocs/op",
            "extra": "660 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+sets/toggle_grant",
            "value": 11708922,
            "unit": "ns/op\t   23162 B/op\t     331 allocs/op",
            "extra": "73 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+sets/toggle_grant - ns/op",
            "value": 11708922,
            "unit": "ns/op",
            "extra": "73 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+sets/toggle_grant - B/op",
            "value": 23162,
            "unit": "B/op",
            "extra": "73 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=postgres+sets/toggle_grant - allocs/op",
            "value": 331,
            "unit": "allocs/op",
            "extra": "73 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-memdb/lookup",
            "value": 4764717,
            "unit": "ns/op\t  796312 B/op\t    9238 allocs/op",
            "extra": "70 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-memdb/lookup - ns/op",
            "value": 4764717,
            "unit": "ns/op",
            "extra": "70 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-memdb/lookup - B/op",
            "value": 796312,
            "unit": "B/op",
            "extra": "70 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-memdb/lookup - allocs/op",
            "value": 9238,
            "unit": "allocs/op",
            "extra": "70 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-memdb/check_hit",
            "value": 327260,
            "unit": "ns/op\t    7336 B/op\t     108 allocs/op",
            "extra": "1006 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-memdb/check_hit - ns/op",
            "value": 327260,
            "unit": "ns/op",
            "extra": "1006 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-memdb/check_hit - B/op",
            "value": 7336,
            "unit": "B/op",
            "extra": "1006 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-memdb/check_hit - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "1006 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-memdb/check_miss",
            "value": 326056,
            "unit": "ns/op\t    7336 B/op\t     108 allocs/op",
            "extra": "962 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-memdb/check_miss - ns/op",
            "value": 326056,
            "unit": "ns/op",
            "extra": "962 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-memdb/check_miss - B/op",
            "value": 7336,
            "unit": "B/op",
            "extra": "962 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-memdb/check_miss - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "962 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-memdb/bulk_100",
            "value": 1243227,
            "unit": "ns/op\t   99474 B/op\t    1711 allocs/op",
            "extra": "319 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-memdb/bulk_100 - ns/op",
            "value": 1243227,
            "unit": "ns/op",
            "extra": "319 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-memdb/bulk_100 - B/op",
            "value": 99474,
            "unit": "B/op",
            "extra": "319 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-memdb/bulk_100 - allocs/op",
            "value": 1711,
            "unit": "allocs/op",
            "extra": "319 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-memdb/subjects_one",
            "value": 372071,
            "unit": "ns/op\t    8938 B/op\t     139 allocs/op",
            "extra": "970 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-memdb/subjects_one - ns/op",
            "value": 372071,
            "unit": "ns/op",
            "extra": "970 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-memdb/subjects_one - B/op",
            "value": 8938,
            "unit": "B/op",
            "extra": "970 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-memdb/subjects_one - allocs/op",
            "value": 139,
            "unit": "allocs/op",
            "extra": "970 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-memdb/toggle_grant",
            "value": 765000,
            "unit": "ns/op\t   15168 B/op\t     225 allocs/op",
            "extra": "458 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-memdb/toggle_grant - ns/op",
            "value": 765000,
            "unit": "ns/op",
            "extra": "458 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-memdb/toggle_grant - B/op",
            "value": 15168,
            "unit": "B/op",
            "extra": "458 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-memdb/toggle_grant - allocs/op",
            "value": 225,
            "unit": "allocs/op",
            "extra": "458 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-postgres/lookup",
            "value": 4952056,
            "unit": "ns/op\t  724608 B/op\t    9271 allocs/op",
            "extra": "72 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-postgres/lookup - ns/op",
            "value": 4952056,
            "unit": "ns/op",
            "extra": "72 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-postgres/lookup - B/op",
            "value": 724608,
            "unit": "B/op",
            "extra": "72 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-postgres/lookup - allocs/op",
            "value": 9271,
            "unit": "allocs/op",
            "extra": "72 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-postgres/check_hit",
            "value": 608815,
            "unit": "ns/op\t    7353 B/op\t     108 allocs/op",
            "extra": "583 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-postgres/check_hit - ns/op",
            "value": 608815,
            "unit": "ns/op",
            "extra": "583 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-postgres/check_hit - B/op",
            "value": 7353,
            "unit": "B/op",
            "extra": "583 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-postgres/check_hit - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "583 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-postgres/check_miss",
            "value": 597282,
            "unit": "ns/op\t    7298 B/op\t     108 allocs/op",
            "extra": "578 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-postgres/check_miss - ns/op",
            "value": 597282,
            "unit": "ns/op",
            "extra": "578 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-postgres/check_miss - B/op",
            "value": 7298,
            "unit": "B/op",
            "extra": "578 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-postgres/check_miss - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "578 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-postgres/bulk_100",
            "value": 1439805,
            "unit": "ns/op\t   99193 B/op\t    1711 allocs/op",
            "extra": "249 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-postgres/bulk_100 - ns/op",
            "value": 1439805,
            "unit": "ns/op",
            "extra": "249 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-postgres/bulk_100 - B/op",
            "value": 99193,
            "unit": "B/op",
            "extra": "249 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-postgres/bulk_100 - allocs/op",
            "value": 1711,
            "unit": "allocs/op",
            "extra": "249 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-postgres/subjects_one",
            "value": 599014,
            "unit": "ns/op\t    8820 B/op\t     138 allocs/op",
            "extra": "518 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-postgres/subjects_one - ns/op",
            "value": 599014,
            "unit": "ns/op",
            "extra": "518 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-postgres/subjects_one - B/op",
            "value": 8820,
            "unit": "B/op",
            "extra": "518 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-postgres/subjects_one - allocs/op",
            "value": 138,
            "unit": "allocs/op",
            "extra": "518 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-postgres/toggle_grant",
            "value": 9316339,
            "unit": "ns/op\t   16756 B/op\t     226 allocs/op",
            "extra": "86 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-postgres/toggle_grant - ns/op",
            "value": 9316339,
            "unit": "ns/op",
            "extra": "86 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-postgres/toggle_grant - B/op",
            "value": 16756,
            "unit": "B/op",
            "extra": "86 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=90/path=direct/kind=spicedb-postgres/toggle_grant - allocs/op",
            "value": 226,
            "unit": "allocs/op",
            "extra": "86 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory/lookup",
            "value": 1505530,
            "unit": "ns/op\t  439079 B/op\t    5672 allocs/op",
            "extra": "232 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory/lookup - ns/op",
            "value": 1505530,
            "unit": "ns/op",
            "extra": "232 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory/lookup - B/op",
            "value": 439079,
            "unit": "B/op",
            "extra": "232 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory/lookup - allocs/op",
            "value": 5672,
            "unit": "allocs/op",
            "extra": "232 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory/check_hit",
            "value": 77452,
            "unit": "ns/op\t    2164 B/op\t      24 allocs/op",
            "extra": "4260 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory/check_hit - ns/op",
            "value": 77452,
            "unit": "ns/op",
            "extra": "4260 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory/check_hit - B/op",
            "value": 2164,
            "unit": "B/op",
            "extra": "4260 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory/check_hit - allocs/op",
            "value": 24,
            "unit": "allocs/op",
            "extra": "4260 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory/check_miss",
            "value": 86364,
            "unit": "ns/op\t    1922 B/op\t      20 allocs/op",
            "extra": "4087 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory/check_miss - ns/op",
            "value": 86364,
            "unit": "ns/op",
            "extra": "4087 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory/check_miss - B/op",
            "value": 1922,
            "unit": "B/op",
            "extra": "4087 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory/check_miss - allocs/op",
            "value": 20,
            "unit": "allocs/op",
            "extra": "4087 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory/bulk_100",
            "value": 1039702,
            "unit": "ns/op\t  333044 B/op\t    1548 allocs/op",
            "extra": "349 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory/bulk_100 - ns/op",
            "value": 1039702,
            "unit": "ns/op",
            "extra": "349 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory/bulk_100 - B/op",
            "value": 333044,
            "unit": "B/op",
            "extra": "349 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory/bulk_100 - allocs/op",
            "value": 1548,
            "unit": "allocs/op",
            "extra": "349 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory/subjects_one",
            "value": 88078,
            "unit": "ns/op\t    3033 B/op\t      32 allocs/op",
            "extra": "3910 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory/subjects_one - ns/op",
            "value": 88078,
            "unit": "ns/op",
            "extra": "3910 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory/subjects_one - B/op",
            "value": 3033,
            "unit": "B/op",
            "extra": "3910 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory/subjects_one - allocs/op",
            "value": 32,
            "unit": "allocs/op",
            "extra": "3910 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory/toggle_team_edge",
            "value": 461496,
            "unit": "ns/op\t  984903 B/op\t      30 allocs/op",
            "extra": "757 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory/toggle_team_edge - ns/op",
            "value": 461496,
            "unit": "ns/op",
            "extra": "757 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory/toggle_team_edge - B/op",
            "value": 984903,
            "unit": "B/op",
            "extra": "757 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory/toggle_team_edge - allocs/op",
            "value": 30,
            "unit": "allocs/op",
            "extra": "757 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory+index/lookup",
            "value": 41153,
            "unit": "ns/op\t   33853 B/op\t      40 allocs/op",
            "extra": "8485 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory+index/lookup - ns/op",
            "value": 41153,
            "unit": "ns/op",
            "extra": "8485 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory+index/lookup - B/op",
            "value": 33853,
            "unit": "B/op",
            "extra": "8485 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory+index/lookup - allocs/op",
            "value": 40,
            "unit": "allocs/op",
            "extra": "8485 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory+index/check_hit",
            "value": 1889,
            "unit": "ns/op\t    1017 B/op\t      11 allocs/op",
            "extra": "175794 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory+index/check_hit - ns/op",
            "value": 1889,
            "unit": "ns/op",
            "extra": "175794 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory+index/check_hit - B/op",
            "value": 1017,
            "unit": "B/op",
            "extra": "175794 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory+index/check_hit - allocs/op",
            "value": 11,
            "unit": "allocs/op",
            "extra": "175794 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory+index/check_miss",
            "value": 1687,
            "unit": "ns/op\t     921 B/op\t      10 allocs/op",
            "extra": "217122 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory+index/check_miss - ns/op",
            "value": 1687,
            "unit": "ns/op",
            "extra": "217122 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory+index/check_miss - B/op",
            "value": 921,
            "unit": "B/op",
            "extra": "217122 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory+index/check_miss - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "217122 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory+index/bulk_100",
            "value": 170990,
            "unit": "ns/op\t   93790 B/op\t     326 allocs/op",
            "extra": "2146 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory+index/bulk_100 - ns/op",
            "value": 170990,
            "unit": "ns/op",
            "extra": "2146 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory+index/bulk_100 - B/op",
            "value": 93790,
            "unit": "B/op",
            "extra": "2146 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory+index/bulk_100 - allocs/op",
            "value": 326,
            "unit": "allocs/op",
            "extra": "2146 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory+index/subjects_one",
            "value": 2165,
            "unit": "ns/op\t    1704 B/op\t      18 allocs/op",
            "extra": "192984 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory+index/subjects_one - ns/op",
            "value": 2165,
            "unit": "ns/op",
            "extra": "192984 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory+index/subjects_one - B/op",
            "value": 1704,
            "unit": "B/op",
            "extra": "192984 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory+index/subjects_one - allocs/op",
            "value": 18,
            "unit": "allocs/op",
            "extra": "192984 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory+index/toggle_team_edge",
            "value": 408134,
            "unit": "ns/op\t  984728 B/op\t      30 allocs/op",
            "extra": "1146 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory+index/toggle_team_edge - ns/op",
            "value": 408134,
            "unit": "ns/op",
            "extra": "1146 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory+index/toggle_team_edge - B/op",
            "value": 984728,
            "unit": "B/op",
            "extra": "1146 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=memory+index/toggle_team_edge - allocs/op",
            "value": 30,
            "unit": "allocs/op",
            "extra": "1146 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres/lookup",
            "value": 3769331,
            "unit": "ns/op\t  309404 B/op\t    4063 allocs/op",
            "extra": "88 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres/lookup - ns/op",
            "value": 3769331,
            "unit": "ns/op",
            "extra": "88 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres/lookup - B/op",
            "value": 309404,
            "unit": "B/op",
            "extra": "88 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres/lookup - allocs/op",
            "value": 4063,
            "unit": "allocs/op",
            "extra": "88 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres/check_hit",
            "value": 448579,
            "unit": "ns/op\t    5643 B/op\t      99 allocs/op",
            "extra": "777 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres/check_hit - ns/op",
            "value": 448579,
            "unit": "ns/op",
            "extra": "777 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres/check_hit - B/op",
            "value": 5643,
            "unit": "B/op",
            "extra": "777 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres/check_hit - allocs/op",
            "value": 99,
            "unit": "allocs/op",
            "extra": "777 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres/check_miss",
            "value": 473802,
            "unit": "ns/op\t    5008 B/op\t      81 allocs/op",
            "extra": "801 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres/check_miss - ns/op",
            "value": 473802,
            "unit": "ns/op",
            "extra": "801 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres/check_miss - B/op",
            "value": 5008,
            "unit": "B/op",
            "extra": "801 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres/check_miss - allocs/op",
            "value": 81,
            "unit": "allocs/op",
            "extra": "801 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres/bulk_100",
            "value": 1921233,
            "unit": "ns/op\t  402212 B/op\t    3809 allocs/op",
            "extra": "194 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres/bulk_100 - ns/op",
            "value": 1921233,
            "unit": "ns/op",
            "extra": "194 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres/bulk_100 - B/op",
            "value": 402212,
            "unit": "B/op",
            "extra": "194 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres/bulk_100 - allocs/op",
            "value": 3809,
            "unit": "allocs/op",
            "extra": "194 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres/subjects_one",
            "value": 447239,
            "unit": "ns/op\t    6154 B/op\t      93 allocs/op",
            "extra": "888 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres/subjects_one - ns/op",
            "value": 447239,
            "unit": "ns/op",
            "extra": "888 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres/subjects_one - B/op",
            "value": 6154,
            "unit": "B/op",
            "extra": "888 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres/subjects_one - allocs/op",
            "value": 93,
            "unit": "allocs/op",
            "extra": "888 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres/toggle_team_edge",
            "value": 4932070,
            "unit": "ns/op\t   12245 B/op\t     148 allocs/op",
            "extra": "98 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres/toggle_team_edge - ns/op",
            "value": 4932070,
            "unit": "ns/op",
            "extra": "98 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres/toggle_team_edge - B/op",
            "value": 12245,
            "unit": "B/op",
            "extra": "98 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres/toggle_team_edge - allocs/op",
            "value": 148,
            "unit": "allocs/op",
            "extra": "98 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+closure/lookup",
            "value": 925962,
            "unit": "ns/op\t   28341 B/op\t     438 allocs/op",
            "extra": "381 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+closure/lookup - ns/op",
            "value": 925962,
            "unit": "ns/op",
            "extra": "381 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+closure/lookup - B/op",
            "value": 28341,
            "unit": "B/op",
            "extra": "381 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+closure/lookup - allocs/op",
            "value": 438,
            "unit": "allocs/op",
            "extra": "381 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+closure/check_hit",
            "value": 559264,
            "unit": "ns/op\t    5887 B/op\t      97 allocs/op",
            "extra": "709 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+closure/check_hit - ns/op",
            "value": 559264,
            "unit": "ns/op",
            "extra": "709 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+closure/check_hit - B/op",
            "value": 5887,
            "unit": "B/op",
            "extra": "709 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+closure/check_hit - allocs/op",
            "value": 97,
            "unit": "allocs/op",
            "extra": "709 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+closure/check_miss",
            "value": 915097,
            "unit": "ns/op\t    9891 B/op\t     162 allocs/op",
            "extra": "384 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+closure/check_miss - ns/op",
            "value": 915097,
            "unit": "ns/op",
            "extra": "384 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+closure/check_miss - B/op",
            "value": 9891,
            "unit": "B/op",
            "extra": "384 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+closure/check_miss - allocs/op",
            "value": 162,
            "unit": "allocs/op",
            "extra": "384 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+closure/bulk_100",
            "value": 2175236,
            "unit": "ns/op\t  168590 B/op\t    1635 allocs/op",
            "extra": "168 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+closure/bulk_100 - ns/op",
            "value": 2175236,
            "unit": "ns/op",
            "extra": "168 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+closure/bulk_100 - B/op",
            "value": 168590,
            "unit": "B/op",
            "extra": "168 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+closure/bulk_100 - allocs/op",
            "value": 1635,
            "unit": "allocs/op",
            "extra": "168 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+closure/subjects_one",
            "value": 881808,
            "unit": "ns/op\t    9140 B/op\t     158 allocs/op",
            "extra": "430 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+closure/subjects_one - ns/op",
            "value": 881808,
            "unit": "ns/op",
            "extra": "430 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+closure/subjects_one - B/op",
            "value": 9140,
            "unit": "B/op",
            "extra": "430 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+closure/subjects_one - allocs/op",
            "value": 158,
            "unit": "allocs/op",
            "extra": "430 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+closure/toggle_team_edge",
            "value": 10207577,
            "unit": "ns/op\t   15631 B/op\t     271 allocs/op",
            "extra": "68 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+closure/toggle_team_edge - ns/op",
            "value": 10207577,
            "unit": "ns/op",
            "extra": "68 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+closure/toggle_team_edge - B/op",
            "value": 15631,
            "unit": "B/op",
            "extra": "68 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+closure/toggle_team_edge - allocs/op",
            "value": 271,
            "unit": "allocs/op",
            "extra": "68 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+sets/lookup",
            "value": 805463,
            "unit": "ns/op\t   19998 B/op\t     392 allocs/op",
            "extra": "472 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+sets/lookup - ns/op",
            "value": 805463,
            "unit": "ns/op",
            "extra": "472 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+sets/lookup - B/op",
            "value": 19998,
            "unit": "B/op",
            "extra": "472 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+sets/lookup - allocs/op",
            "value": 392,
            "unit": "allocs/op",
            "extra": "472 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+sets/check_hit",
            "value": 789468,
            "unit": "ns/op\t    6017 B/op\t      77 allocs/op",
            "extra": "452 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+sets/check_hit - ns/op",
            "value": 789468,
            "unit": "ns/op",
            "extra": "452 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+sets/check_hit - B/op",
            "value": 6017,
            "unit": "B/op",
            "extra": "452 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+sets/check_hit - allocs/op",
            "value": 77,
            "unit": "allocs/op",
            "extra": "452 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+sets/check_miss",
            "value": 784653,
            "unit": "ns/op\t    6036 B/op\t      77 allocs/op",
            "extra": "470 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+sets/check_miss - ns/op",
            "value": 784653,
            "unit": "ns/op",
            "extra": "470 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+sets/check_miss - B/op",
            "value": 6036,
            "unit": "B/op",
            "extra": "470 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+sets/check_miss - allocs/op",
            "value": 77,
            "unit": "allocs/op",
            "extra": "470 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+sets/bulk_100",
            "value": 2266168,
            "unit": "ns/op\t   69250 B/op\t     907 allocs/op",
            "extra": "177 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+sets/bulk_100 - ns/op",
            "value": 2266168,
            "unit": "ns/op",
            "extra": "177 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+sets/bulk_100 - B/op",
            "value": 69250,
            "unit": "B/op",
            "extra": "177 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+sets/bulk_100 - allocs/op",
            "value": 907,
            "unit": "allocs/op",
            "extra": "177 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+sets/subjects_one",
            "value": 627080,
            "unit": "ns/op\t    3943 B/op\t      82 allocs/op",
            "extra": "586 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+sets/subjects_one - ns/op",
            "value": 627080,
            "unit": "ns/op",
            "extra": "586 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+sets/subjects_one - B/op",
            "value": 3943,
            "unit": "B/op",
            "extra": "586 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+sets/subjects_one - allocs/op",
            "value": 82,
            "unit": "allocs/op",
            "extra": "586 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+sets/toggle_team_edge",
            "value": 15597155,
            "unit": "ns/op\t   27311 B/op\t     447 allocs/op",
            "extra": "52 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+sets/toggle_team_edge - ns/op",
            "value": 15597155,
            "unit": "ns/op",
            "extra": "52 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+sets/toggle_team_edge - B/op",
            "value": 27311,
            "unit": "B/op",
            "extra": "52 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=postgres+sets/toggle_team_edge - allocs/op",
            "value": 447,
            "unit": "allocs/op",
            "extra": "52 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-memdb/lookup",
            "value": 938842,
            "unit": "ns/op\t   95653 B/op\t    1151 allocs/op",
            "extra": "409 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-memdb/lookup - ns/op",
            "value": 938842,
            "unit": "ns/op",
            "extra": "409 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-memdb/lookup - B/op",
            "value": 95653,
            "unit": "B/op",
            "extra": "409 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-memdb/lookup - allocs/op",
            "value": 1151,
            "unit": "allocs/op",
            "extra": "409 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-memdb/check_hit",
            "value": 352540,
            "unit": "ns/op\t    7366 B/op\t     108 allocs/op",
            "extra": "1040 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-memdb/check_hit - ns/op",
            "value": 352540,
            "unit": "ns/op",
            "extra": "1040 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-memdb/check_hit - B/op",
            "value": 7366,
            "unit": "B/op",
            "extra": "1040 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-memdb/check_hit - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "1040 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-memdb/check_miss",
            "value": 371013,
            "unit": "ns/op\t    7369 B/op\t     108 allocs/op",
            "extra": "991 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-memdb/check_miss - ns/op",
            "value": 371013,
            "unit": "ns/op",
            "extra": "991 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-memdb/check_miss - B/op",
            "value": 7369,
            "unit": "B/op",
            "extra": "991 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-memdb/check_miss - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "991 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-memdb/bulk_100",
            "value": 1272017,
            "unit": "ns/op\t   99205 B/op\t    1711 allocs/op",
            "extra": "296 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-memdb/bulk_100 - ns/op",
            "value": 1272017,
            "unit": "ns/op",
            "extra": "296 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-memdb/bulk_100 - B/op",
            "value": 99205,
            "unit": "B/op",
            "extra": "296 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-memdb/bulk_100 - allocs/op",
            "value": 1711,
            "unit": "allocs/op",
            "extra": "296 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-memdb/subjects_one",
            "value": 350929,
            "unit": "ns/op\t    8971 B/op\t     139 allocs/op",
            "extra": "979 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-memdb/subjects_one - ns/op",
            "value": 350929,
            "unit": "ns/op",
            "extra": "979 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-memdb/subjects_one - B/op",
            "value": 8971,
            "unit": "B/op",
            "extra": "979 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-memdb/subjects_one - allocs/op",
            "value": 139,
            "unit": "allocs/op",
            "extra": "979 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-memdb/toggle_team_edge",
            "value": 811681,
            "unit": "ns/op\t   15343 B/op\t     225 allocs/op",
            "extra": "456 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-memdb/toggle_team_edge - ns/op",
            "value": 811681,
            "unit": "ns/op",
            "extra": "456 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-memdb/toggle_team_edge - B/op",
            "value": 15343,
            "unit": "B/op",
            "extra": "456 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-memdb/toggle_team_edge - allocs/op",
            "value": 225,
            "unit": "allocs/op",
            "extra": "456 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-postgres/lookup",
            "value": 1219912,
            "unit": "ns/op\t   84875 B/op\t    1154 allocs/op",
            "extra": "313 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-postgres/lookup - ns/op",
            "value": 1219912,
            "unit": "ns/op",
            "extra": "313 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-postgres/lookup - B/op",
            "value": 84875,
            "unit": "B/op",
            "extra": "313 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-postgres/lookup - allocs/op",
            "value": 1154,
            "unit": "allocs/op",
            "extra": "313 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-postgres/check_hit",
            "value": 635169,
            "unit": "ns/op\t    7297 B/op\t     108 allocs/op",
            "extra": "550 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-postgres/check_hit - ns/op",
            "value": 635169,
            "unit": "ns/op",
            "extra": "550 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-postgres/check_hit - B/op",
            "value": 7297,
            "unit": "B/op",
            "extra": "550 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-postgres/check_hit - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "550 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-postgres/check_miss",
            "value": 642074,
            "unit": "ns/op\t    7297 B/op\t     108 allocs/op",
            "extra": "510 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-postgres/check_miss - ns/op",
            "value": 642074,
            "unit": "ns/op",
            "extra": "510 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-postgres/check_miss - B/op",
            "value": 7297,
            "unit": "B/op",
            "extra": "510 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-postgres/check_miss - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "510 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-postgres/bulk_100",
            "value": 1568827,
            "unit": "ns/op\t   99524 B/op\t    1711 allocs/op",
            "extra": "223 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-postgres/bulk_100 - ns/op",
            "value": 1568827,
            "unit": "ns/op",
            "extra": "223 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-postgres/bulk_100 - B/op",
            "value": 99524,
            "unit": "B/op",
            "extra": "223 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-postgres/bulk_100 - allocs/op",
            "value": 1711,
            "unit": "allocs/op",
            "extra": "223 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-postgres/subjects_one",
            "value": 612599,
            "unit": "ns/op\t    8814 B/op\t     138 allocs/op",
            "extra": "584 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-postgres/subjects_one - ns/op",
            "value": 612599,
            "unit": "ns/op",
            "extra": "584 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-postgres/subjects_one - B/op",
            "value": 8814,
            "unit": "B/op",
            "extra": "584 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-postgres/subjects_one - allocs/op",
            "value": 138,
            "unit": "allocs/op",
            "extra": "584 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-postgres/toggle_team_edge",
            "value": 12335098,
            "unit": "ns/op\t   16092 B/op\t     226 allocs/op",
            "extra": "79 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-postgres/toggle_team_edge - ns/op",
            "value": 12335098,
            "unit": "ns/op",
            "extra": "79 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-postgres/toggle_team_edge - B/op",
            "value": 16092,
            "unit": "B/op",
            "extra": "79 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=1000/density=10/path=team/kind=spicedb-postgres/toggle_team_edge - allocs/op",
            "value": 226,
            "unit": "allocs/op",
            "extra": "79 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory/lookup",
            "value": 11219584,
            "unit": "ns/op\t 1623659 B/op\t     242 allocs/op",
            "extra": "28 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory/lookup - ns/op",
            "value": 11219584,
            "unit": "ns/op",
            "extra": "28 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory/lookup - B/op",
            "value": 1623659,
            "unit": "B/op",
            "extra": "28 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory/lookup - allocs/op",
            "value": 242,
            "unit": "allocs/op",
            "extra": "28 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory/check_hit",
            "value": 561823,
            "unit": "ns/op\t    1910 B/op\t      17 allocs/op",
            "extra": "678 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory/check_hit - ns/op",
            "value": 561823,
            "unit": "ns/op",
            "extra": "678 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory/check_hit - B/op",
            "value": 1910,
            "unit": "B/op",
            "extra": "678 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory/check_hit - allocs/op",
            "value": 17,
            "unit": "allocs/op",
            "extra": "678 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory/check_miss",
            "value": 1042670,
            "unit": "ns/op\t    2025 B/op\t      20 allocs/op",
            "extra": "340 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory/check_miss - ns/op",
            "value": 1042670,
            "unit": "ns/op",
            "extra": "340 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory/check_miss - B/op",
            "value": 2025,
            "unit": "B/op",
            "extra": "340 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory/check_miss - allocs/op",
            "value": 20,
            "unit": "allocs/op",
            "extra": "340 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory/bulk_100",
            "value": 3819493,
            "unit": "ns/op\t  332076 B/op\t    1367 allocs/op",
            "extra": "86 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory/bulk_100 - ns/op",
            "value": 3819493,
            "unit": "ns/op",
            "extra": "86 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory/bulk_100 - B/op",
            "value": 332076,
            "unit": "B/op",
            "extra": "86 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory/bulk_100 - allocs/op",
            "value": 1367,
            "unit": "allocs/op",
            "extra": "86 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory/subjects_one",
            "value": 1044854,
            "unit": "ns/op\t    3027 B/op\t      32 allocs/op",
            "extra": "345 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory/subjects_one - ns/op",
            "value": 1044854,
            "unit": "ns/op",
            "extra": "345 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory/subjects_one - B/op",
            "value": 3027,
            "unit": "B/op",
            "extra": "345 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory/subjects_one - allocs/op",
            "value": 32,
            "unit": "allocs/op",
            "extra": "345 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory/toggle_grant",
            "value": 11174398,
            "unit": "ns/op\t15741454 B/op\t     270 allocs/op",
            "extra": "28 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory/toggle_grant - ns/op",
            "value": 11174398,
            "unit": "ns/op",
            "extra": "28 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory/toggle_grant - B/op",
            "value": 15741454,
            "unit": "B/op",
            "extra": "28 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory/toggle_grant - allocs/op",
            "value": 270,
            "unit": "allocs/op",
            "extra": "28 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory+index/lookup",
            "value": 521827,
            "unit": "ns/op\t  517492 B/op\t      73 allocs/op",
            "extra": "613 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory+index/lookup - ns/op",
            "value": 521827,
            "unit": "ns/op",
            "extra": "613 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory+index/lookup - B/op",
            "value": 517492,
            "unit": "B/op",
            "extra": "613 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory+index/lookup - allocs/op",
            "value": 73,
            "unit": "allocs/op",
            "extra": "613 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory+index/check_hit",
            "value": 1560,
            "unit": "ns/op\t     921 B/op\t      10 allocs/op",
            "extra": "245308 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory+index/check_hit - ns/op",
            "value": 1560,
            "unit": "ns/op",
            "extra": "245308 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory+index/check_hit - B/op",
            "value": 921,
            "unit": "B/op",
            "extra": "245308 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory+index/check_hit - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "245308 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory+index/check_miss",
            "value": 1795,
            "unit": "ns/op\t     921 B/op\t      10 allocs/op",
            "extra": "234922 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory+index/check_miss - ns/op",
            "value": 1795,
            "unit": "ns/op",
            "extra": "234922 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory+index/check_miss - B/op",
            "value": 921,
            "unit": "B/op",
            "extra": "234922 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory+index/check_miss - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "234922 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory+index/bulk_100",
            "value": 597259,
            "unit": "ns/op\t  593545 B/op\t     368 allocs/op",
            "extra": "692 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory+index/bulk_100 - ns/op",
            "value": 597259,
            "unit": "ns/op",
            "extra": "692 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory+index/bulk_100 - B/op",
            "value": 593545,
            "unit": "B/op",
            "extra": "692 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory+index/bulk_100 - allocs/op",
            "value": 368,
            "unit": "allocs/op",
            "extra": "692 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory+index/subjects_one",
            "value": 2210,
            "unit": "ns/op\t    1704 B/op\t      18 allocs/op",
            "extra": "174546 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory+index/subjects_one - ns/op",
            "value": 2210,
            "unit": "ns/op",
            "extra": "174546 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory+index/subjects_one - B/op",
            "value": 1704,
            "unit": "B/op",
            "extra": "174546 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory+index/subjects_one - allocs/op",
            "value": 18,
            "unit": "allocs/op",
            "extra": "174546 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory+index/toggle_grant",
            "value": 15131528,
            "unit": "ns/op\t15739465 B/op\t     270 allocs/op",
            "extra": "32 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory+index/toggle_grant - ns/op",
            "value": 15131528,
            "unit": "ns/op",
            "extra": "32 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory+index/toggle_grant - B/op",
            "value": 15739465,
            "unit": "B/op",
            "extra": "32 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=memory+index/toggle_grant - allocs/op",
            "value": 270,
            "unit": "allocs/op",
            "extra": "32 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres/lookup",
            "value": 7550091,
            "unit": "ns/op\t 2587957 B/op\t   30097 allocs/op",
            "extra": "48 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres/lookup - ns/op",
            "value": 7550091,
            "unit": "ns/op",
            "extra": "48 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres/lookup - B/op",
            "value": 2587957,
            "unit": "B/op",
            "extra": "48 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres/lookup - allocs/op",
            "value": 30097,
            "unit": "allocs/op",
            "extra": "48 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres/check_hit",
            "value": 288828,
            "unit": "ns/op\t    3993 B/op\t      67 allocs/op",
            "extra": "1248 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres/check_hit - ns/op",
            "value": 288828,
            "unit": "ns/op",
            "extra": "1248 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres/check_hit - B/op",
            "value": 3993,
            "unit": "B/op",
            "extra": "1248 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres/check_hit - allocs/op",
            "value": 67,
            "unit": "allocs/op",
            "extra": "1248 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres/check_miss",
            "value": 416245,
            "unit": "ns/op\t    4986 B/op\t      81 allocs/op",
            "extra": "819 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres/check_miss - ns/op",
            "value": 416245,
            "unit": "ns/op",
            "extra": "819 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres/check_miss - B/op",
            "value": 4986,
            "unit": "B/op",
            "extra": "819 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres/check_miss - allocs/op",
            "value": 81,
            "unit": "allocs/op",
            "extra": "819 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres/bulk_100",
            "value": 1696328,
            "unit": "ns/op\t  410791 B/op\t    3807 allocs/op",
            "extra": "202 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres/bulk_100 - ns/op",
            "value": 1696328,
            "unit": "ns/op",
            "extra": "202 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres/bulk_100 - B/op",
            "value": 410791,
            "unit": "B/op",
            "extra": "202 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres/bulk_100 - allocs/op",
            "value": 3807,
            "unit": "allocs/op",
            "extra": "202 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres/subjects_one",
            "value": 470628,
            "unit": "ns/op\t    6049 B/op\t      93 allocs/op",
            "extra": "856 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres/subjects_one - ns/op",
            "value": 470628,
            "unit": "ns/op",
            "extra": "856 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres/subjects_one - B/op",
            "value": 6049,
            "unit": "B/op",
            "extra": "856 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres/subjects_one - allocs/op",
            "value": 93,
            "unit": "allocs/op",
            "extra": "856 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres/toggle_grant",
            "value": 12212821,
            "unit": "ns/op\t   11076 B/op\t     144 allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres/toggle_grant - ns/op",
            "value": 12212821,
            "unit": "ns/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres/toggle_grant - B/op",
            "value": 11076,
            "unit": "B/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres/toggle_grant - allocs/op",
            "value": 144,
            "unit": "allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+closure/lookup",
            "value": 2246790,
            "unit": "ns/op\t  340143 B/op\t    3332 allocs/op",
            "extra": "154 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+closure/lookup - ns/op",
            "value": 2246790,
            "unit": "ns/op",
            "extra": "154 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+closure/lookup - B/op",
            "value": 340143,
            "unit": "B/op",
            "extra": "154 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+closure/lookup - allocs/op",
            "value": 3332,
            "unit": "allocs/op",
            "extra": "154 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+closure/check_hit",
            "value": 569773,
            "unit": "ns/op\t    5905 B/op\t      97 allocs/op",
            "extra": "625 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+closure/check_hit - ns/op",
            "value": 569773,
            "unit": "ns/op",
            "extra": "625 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+closure/check_hit - B/op",
            "value": 5905,
            "unit": "B/op",
            "extra": "625 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+closure/check_hit - allocs/op",
            "value": 97,
            "unit": "allocs/op",
            "extra": "625 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+closure/check_miss",
            "value": 880340,
            "unit": "ns/op\t    9784 B/op\t     162 allocs/op",
            "extra": "409 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+closure/check_miss - ns/op",
            "value": 880340,
            "unit": "ns/op",
            "extra": "409 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+closure/check_miss - B/op",
            "value": 9784,
            "unit": "B/op",
            "extra": "409 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+closure/check_miss - allocs/op",
            "value": 162,
            "unit": "allocs/op",
            "extra": "409 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+closure/bulk_100",
            "value": 2470564,
            "unit": "ns/op\t  180740 B/op\t    1685 allocs/op",
            "extra": "141 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+closure/bulk_100 - ns/op",
            "value": 2470564,
            "unit": "ns/op",
            "extra": "141 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+closure/bulk_100 - B/op",
            "value": 180740,
            "unit": "B/op",
            "extra": "141 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+closure/bulk_100 - allocs/op",
            "value": 1685,
            "unit": "allocs/op",
            "extra": "141 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+closure/subjects_one",
            "value": 844040,
            "unit": "ns/op\t    9156 B/op\t     158 allocs/op",
            "extra": "439 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+closure/subjects_one - ns/op",
            "value": 844040,
            "unit": "ns/op",
            "extra": "439 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+closure/subjects_one - B/op",
            "value": 9156,
            "unit": "B/op",
            "extra": "439 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+closure/subjects_one - allocs/op",
            "value": 158,
            "unit": "allocs/op",
            "extra": "439 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+closure/toggle_grant",
            "value": 8197758,
            "unit": "ns/op\t    9413 B/op\t     144 allocs/op",
            "extra": "166 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+closure/toggle_grant - ns/op",
            "value": 8197758,
            "unit": "ns/op",
            "extra": "166 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+closure/toggle_grant - B/op",
            "value": 9413,
            "unit": "B/op",
            "extra": "166 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+closure/toggle_grant - allocs/op",
            "value": 144,
            "unit": "allocs/op",
            "extra": "166 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+sets/lookup",
            "value": 2262964,
            "unit": "ns/op\t  229871 B/op\t    3275 allocs/op",
            "extra": "157 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+sets/lookup - ns/op",
            "value": 2262964,
            "unit": "ns/op",
            "extra": "157 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+sets/lookup - B/op",
            "value": 229871,
            "unit": "B/op",
            "extra": "157 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+sets/lookup - allocs/op",
            "value": 3275,
            "unit": "allocs/op",
            "extra": "157 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+sets/check_hit",
            "value": 711216,
            "unit": "ns/op\t    5855 B/op\t      77 allocs/op",
            "extra": "513 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+sets/check_hit - ns/op",
            "value": 711216,
            "unit": "ns/op",
            "extra": "513 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+sets/check_hit - B/op",
            "value": 5855,
            "unit": "B/op",
            "extra": "513 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+sets/check_hit - allocs/op",
            "value": 77,
            "unit": "allocs/op",
            "extra": "513 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+sets/check_miss",
            "value": 713555,
            "unit": "ns/op\t    6020 B/op\t      77 allocs/op",
            "extra": "511 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+sets/check_miss - ns/op",
            "value": 713555,
            "unit": "ns/op",
            "extra": "511 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+sets/check_miss - B/op",
            "value": 6020,
            "unit": "B/op",
            "extra": "511 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+sets/check_miss - allocs/op",
            "value": 77,
            "unit": "allocs/op",
            "extra": "511 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+sets/bulk_100",
            "value": 2604615,
            "unit": "ns/op\t   74714 B/op\t     947 allocs/op",
            "extra": "140 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+sets/bulk_100 - ns/op",
            "value": 2604615,
            "unit": "ns/op",
            "extra": "140 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+sets/bulk_100 - B/op",
            "value": 74714,
            "unit": "B/op",
            "extra": "140 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+sets/bulk_100 - allocs/op",
            "value": 947,
            "unit": "allocs/op",
            "extra": "140 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+sets/subjects_one",
            "value": 589417,
            "unit": "ns/op\t    3820 B/op\t      82 allocs/op",
            "extra": "590 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+sets/subjects_one - ns/op",
            "value": 589417,
            "unit": "ns/op",
            "extra": "590 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+sets/subjects_one - B/op",
            "value": 3820,
            "unit": "B/op",
            "extra": "590 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+sets/subjects_one - allocs/op",
            "value": 82,
            "unit": "allocs/op",
            "extra": "590 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+sets/toggle_grant",
            "value": 11163707,
            "unit": "ns/op\t   23367 B/op\t     331 allocs/op",
            "extra": "94 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+sets/toggle_grant - ns/op",
            "value": 11163707,
            "unit": "ns/op",
            "extra": "94 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+sets/toggle_grant - B/op",
            "value": 23367,
            "unit": "B/op",
            "extra": "94 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=postgres+sets/toggle_grant - allocs/op",
            "value": 331,
            "unit": "allocs/op",
            "extra": "94 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-memdb/lookup",
            "value": 5151807,
            "unit": "ns/op\t  958381 B/op\t   10893 allocs/op",
            "extra": "63 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-memdb/lookup - ns/op",
            "value": 5151807,
            "unit": "ns/op",
            "extra": "63 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-memdb/lookup - B/op",
            "value": 958381,
            "unit": "B/op",
            "extra": "63 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-memdb/lookup - allocs/op",
            "value": 10893,
            "unit": "allocs/op",
            "extra": "63 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-memdb/check_hit",
            "value": 332668,
            "unit": "ns/op\t    7368 B/op\t     108 allocs/op",
            "extra": "1014 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-memdb/check_hit - ns/op",
            "value": 332668,
            "unit": "ns/op",
            "extra": "1014 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-memdb/check_hit - B/op",
            "value": 7368,
            "unit": "B/op",
            "extra": "1014 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-memdb/check_hit - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "1014 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-memdb/check_miss",
            "value": 341191,
            "unit": "ns/op\t    7394 B/op\t     108 allocs/op",
            "extra": "978 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-memdb/check_miss - ns/op",
            "value": 341191,
            "unit": "ns/op",
            "extra": "978 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-memdb/check_miss - B/op",
            "value": 7394,
            "unit": "B/op",
            "extra": "978 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-memdb/check_miss - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "978 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-memdb/bulk_100",
            "value": 1165649,
            "unit": "ns/op\t   99318 B/op\t    1711 allocs/op",
            "extra": "295 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-memdb/bulk_100 - ns/op",
            "value": 1165649,
            "unit": "ns/op",
            "extra": "295 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-memdb/bulk_100 - B/op",
            "value": 99318,
            "unit": "B/op",
            "extra": "295 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-memdb/bulk_100 - allocs/op",
            "value": 1711,
            "unit": "allocs/op",
            "extra": "295 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-memdb/subjects_one",
            "value": 386006,
            "unit": "ns/op\t    9025 B/op\t     139 allocs/op",
            "extra": "835 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-memdb/subjects_one - ns/op",
            "value": 386006,
            "unit": "ns/op",
            "extra": "835 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-memdb/subjects_one - B/op",
            "value": 9025,
            "unit": "B/op",
            "extra": "835 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-memdb/subjects_one - allocs/op",
            "value": 139,
            "unit": "allocs/op",
            "extra": "835 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-memdb/toggle_grant",
            "value": 841799,
            "unit": "ns/op\t   15327 B/op\t     225 allocs/op",
            "extra": "410 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-memdb/toggle_grant - ns/op",
            "value": 841799,
            "unit": "ns/op",
            "extra": "410 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-memdb/toggle_grant - B/op",
            "value": 15327,
            "unit": "B/op",
            "extra": "410 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-memdb/toggle_grant - allocs/op",
            "value": 225,
            "unit": "allocs/op",
            "extra": "410 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-postgres/lookup",
            "value": 5382848,
            "unit": "ns/op\t  878918 B/op\t   10907 allocs/op",
            "extra": "62 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-postgres/lookup - ns/op",
            "value": 5382848,
            "unit": "ns/op",
            "extra": "62 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-postgres/lookup - B/op",
            "value": 878918,
            "unit": "B/op",
            "extra": "62 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-postgres/lookup - allocs/op",
            "value": 10907,
            "unit": "allocs/op",
            "extra": "62 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-postgres/check_hit",
            "value": 589800,
            "unit": "ns/op\t    7298 B/op\t     108 allocs/op",
            "extra": "568 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-postgres/check_hit - ns/op",
            "value": 589800,
            "unit": "ns/op",
            "extra": "568 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-postgres/check_hit - B/op",
            "value": 7298,
            "unit": "B/op",
            "extra": "568 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-postgres/check_hit - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "568 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-postgres/check_miss",
            "value": 648809,
            "unit": "ns/op\t    7349 B/op\t     108 allocs/op",
            "extra": "612 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-postgres/check_miss - ns/op",
            "value": 648809,
            "unit": "ns/op",
            "extra": "612 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-postgres/check_miss - B/op",
            "value": 7349,
            "unit": "B/op",
            "extra": "612 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-postgres/check_miss - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "612 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-postgres/bulk_100",
            "value": 1410993,
            "unit": "ns/op\t   99321 B/op\t    1711 allocs/op",
            "extra": "248 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-postgres/bulk_100 - ns/op",
            "value": 1410993,
            "unit": "ns/op",
            "extra": "248 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-postgres/bulk_100 - B/op",
            "value": 99321,
            "unit": "B/op",
            "extra": "248 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-postgres/bulk_100 - allocs/op",
            "value": 1711,
            "unit": "allocs/op",
            "extra": "248 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-postgres/subjects_one",
            "value": 598970,
            "unit": "ns/op\t    8887 B/op\t     138 allocs/op",
            "extra": "556 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-postgres/subjects_one - ns/op",
            "value": 598970,
            "unit": "ns/op",
            "extra": "556 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-postgres/subjects_one - B/op",
            "value": 8887,
            "unit": "B/op",
            "extra": "556 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-postgres/subjects_one - allocs/op",
            "value": 138,
            "unit": "allocs/op",
            "extra": "556 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-postgres/toggle_grant",
            "value": 13125404,
            "unit": "ns/op\t   15544 B/op\t     226 allocs/op",
            "extra": "102 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-postgres/toggle_grant - ns/op",
            "value": 13125404,
            "unit": "ns/op",
            "extra": "102 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-postgres/toggle_grant - B/op",
            "value": 15544,
            "unit": "B/op",
            "extra": "102 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=direct/kind=spicedb-postgres/toggle_grant - allocs/op",
            "value": 226,
            "unit": "allocs/op",
            "extra": "102 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory/lookup",
            "value": 66317173,
            "unit": "ns/op\t22460457 B/op\t     628 allocs/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory/lookup - ns/op",
            "value": 66317173,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory/lookup - B/op",
            "value": 22460457,
            "unit": "B/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory/lookup - allocs/op",
            "value": 628,
            "unit": "allocs/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory/check_hit",
            "value": 669967,
            "unit": "ns/op\t    1928 B/op\t      17 allocs/op",
            "extra": "482 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory/check_hit - ns/op",
            "value": 669967,
            "unit": "ns/op",
            "extra": "482 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory/check_hit - B/op",
            "value": 1928,
            "unit": "B/op",
            "extra": "482 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory/check_hit - allocs/op",
            "value": 17,
            "unit": "allocs/op",
            "extra": "482 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory/check_miss",
            "value": 1281200,
            "unit": "ns/op\t    1916 B/op\t      20 allocs/op",
            "extra": "307 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory/check_miss - ns/op",
            "value": 1281200,
            "unit": "ns/op",
            "extra": "307 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory/check_miss - B/op",
            "value": 1916,
            "unit": "B/op",
            "extra": "307 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory/check_miss - allocs/op",
            "value": 20,
            "unit": "allocs/op",
            "extra": "307 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory/bulk_100",
            "value": 3613118,
            "unit": "ns/op\t  423505 B/op\t    1471 allocs/op",
            "extra": "97 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory/bulk_100 - ns/op",
            "value": 3613118,
            "unit": "ns/op",
            "extra": "97 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory/bulk_100 - B/op",
            "value": 423505,
            "unit": "B/op",
            "extra": "97 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory/bulk_100 - allocs/op",
            "value": 1471,
            "unit": "allocs/op",
            "extra": "97 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory/subjects_one",
            "value": 1183258,
            "unit": "ns/op\t    3150 B/op\t      32 allocs/op",
            "extra": "301 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory/subjects_one - ns/op",
            "value": 1183258,
            "unit": "ns/op",
            "extra": "301 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory/subjects_one - B/op",
            "value": 3150,
            "unit": "B/op",
            "extra": "301 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory/subjects_one - allocs/op",
            "value": 32,
            "unit": "allocs/op",
            "extra": "301 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory/toggle_grant",
            "value": 12467946,
            "unit": "ns/op\t15738519 B/op\t     269 allocs/op",
            "extra": "30 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory/toggle_grant - ns/op",
            "value": 12467946,
            "unit": "ns/op",
            "extra": "30 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory/toggle_grant - B/op",
            "value": 15738519,
            "unit": "B/op",
            "extra": "30 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory/toggle_grant - allocs/op",
            "value": 269,
            "unit": "allocs/op",
            "extra": "30 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory+index/lookup",
            "value": 5259241,
            "unit": "ns/op\t 4142280 B/op\t     250 allocs/op",
            "extra": "80 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory+index/lookup - ns/op",
            "value": 5259241,
            "unit": "ns/op",
            "extra": "80 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory+index/lookup - B/op",
            "value": 4142280,
            "unit": "B/op",
            "extra": "80 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory+index/lookup - allocs/op",
            "value": 250,
            "unit": "allocs/op",
            "extra": "80 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory+index/check_hit",
            "value": 1580,
            "unit": "ns/op\t     921 B/op\t      10 allocs/op",
            "extra": "247032 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory+index/check_hit - ns/op",
            "value": 1580,
            "unit": "ns/op",
            "extra": "247032 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory+index/check_hit - B/op",
            "value": 921,
            "unit": "B/op",
            "extra": "247032 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory+index/check_hit - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "247032 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory+index/check_miss",
            "value": 1593,
            "unit": "ns/op\t     921 B/op\t      10 allocs/op",
            "extra": "243528 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory+index/check_miss - ns/op",
            "value": 1593,
            "unit": "ns/op",
            "extra": "243528 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory+index/check_miss - B/op",
            "value": 921,
            "unit": "B/op",
            "extra": "243528 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory+index/check_miss - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "243528 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory+index/bulk_100",
            "value": 3575793,
            "unit": "ns/op\t 4314810 B/op\t     589 allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory+index/bulk_100 - ns/op",
            "value": 3575793,
            "unit": "ns/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory+index/bulk_100 - B/op",
            "value": 4314810,
            "unit": "B/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory+index/bulk_100 - allocs/op",
            "value": 589,
            "unit": "allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory+index/subjects_one",
            "value": 2125,
            "unit": "ns/op\t    1704 B/op\t      18 allocs/op",
            "extra": "199396 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory+index/subjects_one - ns/op",
            "value": 2125,
            "unit": "ns/op",
            "extra": "199396 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory+index/subjects_one - B/op",
            "value": 1704,
            "unit": "B/op",
            "extra": "199396 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory+index/subjects_one - allocs/op",
            "value": 18,
            "unit": "allocs/op",
            "extra": "199396 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory+index/toggle_grant",
            "value": 12065302,
            "unit": "ns/op\t15738519 B/op\t     269 allocs/op",
            "extra": "30 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory+index/toggle_grant - ns/op",
            "value": 12065302,
            "unit": "ns/op",
            "extra": "30 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory+index/toggle_grant - B/op",
            "value": 15738519,
            "unit": "B/op",
            "extra": "30 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=memory+index/toggle_grant - allocs/op",
            "value": 269,
            "unit": "allocs/op",
            "extra": "30 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres/lookup",
            "value": 52225950,
            "unit": "ns/op\t30541258 B/op\t  252277 allocs/op",
            "extra": "6 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres/lookup - ns/op",
            "value": 52225950,
            "unit": "ns/op",
            "extra": "6 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres/lookup - B/op",
            "value": 30541258,
            "unit": "B/op",
            "extra": "6 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres/lookup - allocs/op",
            "value": 252277,
            "unit": "allocs/op",
            "extra": "6 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres/check_hit",
            "value": 308235,
            "unit": "ns/op\t    4095 B/op\t      67 allocs/op",
            "extra": "1316 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres/check_hit - ns/op",
            "value": 308235,
            "unit": "ns/op",
            "extra": "1316 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres/check_hit - B/op",
            "value": 4095,
            "unit": "B/op",
            "extra": "1316 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres/check_hit - allocs/op",
            "value": 67,
            "unit": "allocs/op",
            "extra": "1316 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres/check_miss",
            "value": 396292,
            "unit": "ns/op\t    4939 B/op\t      81 allocs/op",
            "extra": "909 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres/check_miss - ns/op",
            "value": 396292,
            "unit": "ns/op",
            "extra": "909 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres/check_miss - B/op",
            "value": 4939,
            "unit": "B/op",
            "extra": "909 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres/check_miss - allocs/op",
            "value": 81,
            "unit": "allocs/op",
            "extra": "909 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres/bulk_100",
            "value": 1627913,
            "unit": "ns/op\t  515152 B/op\t    4334 allocs/op",
            "extra": "231 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres/bulk_100 - ns/op",
            "value": 1627913,
            "unit": "ns/op",
            "extra": "231 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres/bulk_100 - B/op",
            "value": 515152,
            "unit": "B/op",
            "extra": "231 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres/bulk_100 - allocs/op",
            "value": 4334,
            "unit": "allocs/op",
            "extra": "231 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres/subjects_one",
            "value": 422647,
            "unit": "ns/op\t    6177 B/op\t      93 allocs/op",
            "extra": "891 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres/subjects_one - ns/op",
            "value": 422647,
            "unit": "ns/op",
            "extra": "891 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres/subjects_one - B/op",
            "value": 6177,
            "unit": "B/op",
            "extra": "891 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres/subjects_one - allocs/op",
            "value": 93,
            "unit": "allocs/op",
            "extra": "891 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres/toggle_grant",
            "value": 24419690,
            "unit": "ns/op\t   11459 B/op\t     144 allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres/toggle_grant - ns/op",
            "value": 24419690,
            "unit": "ns/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres/toggle_grant - B/op",
            "value": 11459,
            "unit": "B/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres/toggle_grant - allocs/op",
            "value": 144,
            "unit": "allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+closure/lookup",
            "value": 14348891,
            "unit": "ns/op\t 2906869 B/op\t   27221 allocs/op",
            "extra": "22 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+closure/lookup - ns/op",
            "value": 14348891,
            "unit": "ns/op",
            "extra": "22 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+closure/lookup - B/op",
            "value": 2906869,
            "unit": "B/op",
            "extra": "22 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+closure/lookup - allocs/op",
            "value": 27221,
            "unit": "allocs/op",
            "extra": "22 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+closure/check_hit",
            "value": 622397,
            "unit": "ns/op\t    5990 B/op\t      97 allocs/op",
            "extra": "564 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+closure/check_hit - ns/op",
            "value": 622397,
            "unit": "ns/op",
            "extra": "564 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+closure/check_hit - B/op",
            "value": 5990,
            "unit": "B/op",
            "extra": "564 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+closure/check_hit - allocs/op",
            "value": 97,
            "unit": "allocs/op",
            "extra": "564 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+closure/check_miss",
            "value": 974536,
            "unit": "ns/op\t    9876 B/op\t     162 allocs/op",
            "extra": "424 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+closure/check_miss - ns/op",
            "value": 974536,
            "unit": "ns/op",
            "extra": "424 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+closure/check_miss - B/op",
            "value": 9876,
            "unit": "B/op",
            "extra": "424 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+closure/check_miss - allocs/op",
            "value": 162,
            "unit": "allocs/op",
            "extra": "424 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+closure/bulk_100",
            "value": 3325736,
            "unit": "ns/op\t  223795 B/op\t    2147 allocs/op",
            "extra": "93 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+closure/bulk_100 - ns/op",
            "value": 3325736,
            "unit": "ns/op",
            "extra": "93 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+closure/bulk_100 - B/op",
            "value": 223795,
            "unit": "B/op",
            "extra": "93 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+closure/bulk_100 - allocs/op",
            "value": 2147,
            "unit": "allocs/op",
            "extra": "93 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+closure/subjects_one",
            "value": 913267,
            "unit": "ns/op\t    9152 B/op\t     158 allocs/op",
            "extra": "414 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+closure/subjects_one - ns/op",
            "value": 913267,
            "unit": "ns/op",
            "extra": "414 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+closure/subjects_one - B/op",
            "value": 9152,
            "unit": "B/op",
            "extra": "414 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+closure/subjects_one - allocs/op",
            "value": 158,
            "unit": "allocs/op",
            "extra": "414 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+closure/toggle_grant",
            "value": 6635496,
            "unit": "ns/op\t   11744 B/op\t     144 allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+closure/toggle_grant - ns/op",
            "value": 6635496,
            "unit": "ns/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+closure/toggle_grant - B/op",
            "value": 11744,
            "unit": "B/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+closure/toggle_grant - allocs/op",
            "value": 144,
            "unit": "allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+sets/lookup",
            "value": 14686133,
            "unit": "ns/op\t 2030729 B/op\t   27105 allocs/op",
            "extra": "21 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+sets/lookup - ns/op",
            "value": 14686133,
            "unit": "ns/op",
            "extra": "21 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+sets/lookup - B/op",
            "value": 2030729,
            "unit": "B/op",
            "extra": "21 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+sets/lookup - allocs/op",
            "value": 27105,
            "unit": "allocs/op",
            "extra": "21 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+sets/check_hit",
            "value": 735626,
            "unit": "ns/op\t    5855 B/op\t      77 allocs/op",
            "extra": "510 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+sets/check_hit - ns/op",
            "value": 735626,
            "unit": "ns/op",
            "extra": "510 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+sets/check_hit - B/op",
            "value": 5855,
            "unit": "B/op",
            "extra": "510 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+sets/check_hit - allocs/op",
            "value": 77,
            "unit": "allocs/op",
            "extra": "510 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+sets/check_miss",
            "value": 741583,
            "unit": "ns/op\t    5854 B/op\t      77 allocs/op",
            "extra": "535 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+sets/check_miss - ns/op",
            "value": 741583,
            "unit": "ns/op",
            "extra": "535 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+sets/check_miss - B/op",
            "value": 5854,
            "unit": "B/op",
            "extra": "535 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+sets/check_miss - allocs/op",
            "value": 77,
            "unit": "allocs/op",
            "extra": "535 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+sets/bulk_100",
            "value": 5659131,
            "unit": "ns/op\t  123196 B/op\t    1474 allocs/op",
            "extra": "63 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+sets/bulk_100 - ns/op",
            "value": 5659131,
            "unit": "ns/op",
            "extra": "63 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+sets/bulk_100 - B/op",
            "value": 123196,
            "unit": "B/op",
            "extra": "63 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+sets/bulk_100 - allocs/op",
            "value": 1474,
            "unit": "allocs/op",
            "extra": "63 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+sets/subjects_one",
            "value": 581304,
            "unit": "ns/op\t    3822 B/op\t      82 allocs/op",
            "extra": "634 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+sets/subjects_one - ns/op",
            "value": 581304,
            "unit": "ns/op",
            "extra": "634 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+sets/subjects_one - B/op",
            "value": 3822,
            "unit": "B/op",
            "extra": "634 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+sets/subjects_one - allocs/op",
            "value": 82,
            "unit": "allocs/op",
            "extra": "634 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+sets/toggle_grant",
            "value": 33095010,
            "unit": "ns/op\t   21602 B/op\t     331 allocs/op",
            "extra": "81 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+sets/toggle_grant - ns/op",
            "value": 33095010,
            "unit": "ns/op",
            "extra": "81 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+sets/toggle_grant - B/op",
            "value": 21602,
            "unit": "B/op",
            "extra": "81 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=postgres+sets/toggle_grant - allocs/op",
            "value": 331,
            "unit": "allocs/op",
            "extra": "81 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-memdb/lookup",
            "value": 49420585,
            "unit": "ns/op\t 8285744 B/op\t   91419 allocs/op",
            "extra": "8 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-memdb/lookup - ns/op",
            "value": 49420585,
            "unit": "ns/op",
            "extra": "8 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-memdb/lookup - B/op",
            "value": 8285744,
            "unit": "B/op",
            "extra": "8 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-memdb/lookup - allocs/op",
            "value": 91419,
            "unit": "allocs/op",
            "extra": "8 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-memdb/check_hit",
            "value": 331384,
            "unit": "ns/op\t    7371 B/op\t     108 allocs/op",
            "extra": "1005 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-memdb/check_hit - ns/op",
            "value": 331384,
            "unit": "ns/op",
            "extra": "1005 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-memdb/check_hit - B/op",
            "value": 7371,
            "unit": "B/op",
            "extra": "1005 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-memdb/check_hit - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "1005 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-memdb/check_miss",
            "value": 329539,
            "unit": "ns/op\t    7335 B/op\t     108 allocs/op",
            "extra": "1069 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-memdb/check_miss - ns/op",
            "value": 329539,
            "unit": "ns/op",
            "extra": "1069 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-memdb/check_miss - B/op",
            "value": 7335,
            "unit": "B/op",
            "extra": "1069 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-memdb/check_miss - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "1069 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-memdb/bulk_100",
            "value": 1156140,
            "unit": "ns/op\t   99256 B/op\t    1711 allocs/op",
            "extra": "282 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-memdb/bulk_100 - ns/op",
            "value": 1156140,
            "unit": "ns/op",
            "extra": "282 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-memdb/bulk_100 - B/op",
            "value": 99256,
            "unit": "B/op",
            "extra": "282 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-memdb/bulk_100 - allocs/op",
            "value": 1711,
            "unit": "allocs/op",
            "extra": "282 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-memdb/subjects_one",
            "value": 350112,
            "unit": "ns/op\t    8983 B/op\t     139 allocs/op",
            "extra": "904 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-memdb/subjects_one - ns/op",
            "value": 350112,
            "unit": "ns/op",
            "extra": "904 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-memdb/subjects_one - B/op",
            "value": 8983,
            "unit": "B/op",
            "extra": "904 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-memdb/subjects_one - allocs/op",
            "value": 139,
            "unit": "allocs/op",
            "extra": "904 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-memdb/toggle_grant",
            "value": 779083,
            "unit": "ns/op\t   15244 B/op\t     225 allocs/op",
            "extra": "453 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-memdb/toggle_grant - ns/op",
            "value": 779083,
            "unit": "ns/op",
            "extra": "453 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-memdb/toggle_grant - B/op",
            "value": 15244,
            "unit": "B/op",
            "extra": "453 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-memdb/toggle_grant - allocs/op",
            "value": 225,
            "unit": "allocs/op",
            "extra": "453 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-postgres/lookup",
            "value": 42962613,
            "unit": "ns/op\t 7634418 B/op\t   91767 allocs/op",
            "extra": "8 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-postgres/lookup - ns/op",
            "value": 42962613,
            "unit": "ns/op",
            "extra": "8 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-postgres/lookup - B/op",
            "value": 7634418,
            "unit": "B/op",
            "extra": "8 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-postgres/lookup - allocs/op",
            "value": 91767,
            "unit": "allocs/op",
            "extra": "8 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-postgres/check_hit",
            "value": 585706,
            "unit": "ns/op\t    7356 B/op\t     108 allocs/op",
            "extra": "560 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-postgres/check_hit - ns/op",
            "value": 585706,
            "unit": "ns/op",
            "extra": "560 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-postgres/check_hit - B/op",
            "value": 7356,
            "unit": "B/op",
            "extra": "560 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-postgres/check_hit - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "560 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-postgres/check_miss",
            "value": 590879,
            "unit": "ns/op\t    7353 B/op\t     108 allocs/op",
            "extra": "589 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-postgres/check_miss - ns/op",
            "value": 590879,
            "unit": "ns/op",
            "extra": "589 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-postgres/check_miss - B/op",
            "value": 7353,
            "unit": "B/op",
            "extra": "589 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-postgres/check_miss - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "589 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-postgres/bulk_100",
            "value": 1459414,
            "unit": "ns/op\t   99476 B/op\t    1711 allocs/op",
            "extra": "247 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-postgres/bulk_100 - ns/op",
            "value": 1459414,
            "unit": "ns/op",
            "extra": "247 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-postgres/bulk_100 - B/op",
            "value": 99476,
            "unit": "B/op",
            "extra": "247 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-postgres/bulk_100 - allocs/op",
            "value": 1711,
            "unit": "allocs/op",
            "extra": "247 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-postgres/subjects_one",
            "value": 615622,
            "unit": "ns/op\t    8828 B/op\t     139 allocs/op",
            "extra": "554 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-postgres/subjects_one - ns/op",
            "value": 615622,
            "unit": "ns/op",
            "extra": "554 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-postgres/subjects_one - B/op",
            "value": 8828,
            "unit": "B/op",
            "extra": "554 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-postgres/subjects_one - allocs/op",
            "value": 139,
            "unit": "allocs/op",
            "extra": "554 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-postgres/toggle_grant",
            "value": 19622409,
            "unit": "ns/op\t   15783 B/op\t     226 allocs/op",
            "extra": "60 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-postgres/toggle_grant - ns/op",
            "value": 19622409,
            "unit": "ns/op",
            "extra": "60 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-postgres/toggle_grant - B/op",
            "value": 15783,
            "unit": "B/op",
            "extra": "60 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=90/path=direct/kind=spicedb-postgres/toggle_grant - allocs/op",
            "value": 226,
            "unit": "allocs/op",
            "extra": "60 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory/lookup",
            "value": 20335861,
            "unit": "ns/op\t 5840415 B/op\t   88106 allocs/op",
            "extra": "16 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory/lookup - ns/op",
            "value": 20335861,
            "unit": "ns/op",
            "extra": "16 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory/lookup - B/op",
            "value": 5840415,
            "unit": "B/op",
            "extra": "16 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory/lookup - allocs/op",
            "value": 88106,
            "unit": "allocs/op",
            "extra": "16 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory/check_hit",
            "value": 958725,
            "unit": "ns/op\t    2253 B/op\t      24 allocs/op",
            "extra": "368 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory/check_hit - ns/op",
            "value": 958725,
            "unit": "ns/op",
            "extra": "368 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory/check_hit - B/op",
            "value": 2253,
            "unit": "B/op",
            "extra": "368 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory/check_hit - allocs/op",
            "value": 24,
            "unit": "allocs/op",
            "extra": "368 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory/check_miss",
            "value": 1019786,
            "unit": "ns/op\t    2020 B/op\t      20 allocs/op",
            "extra": "354 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory/check_miss - ns/op",
            "value": 1019786,
            "unit": "ns/op",
            "extra": "354 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory/check_miss - B/op",
            "value": 2020,
            "unit": "B/op",
            "extra": "354 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory/check_miss - allocs/op",
            "value": 20,
            "unit": "allocs/op",
            "extra": "354 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory/bulk_100",
            "value": 4266380,
            "unit": "ns/op\t  350076 B/op\t    1655 allocs/op",
            "extra": "82 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory/bulk_100 - ns/op",
            "value": 4266380,
            "unit": "ns/op",
            "extra": "82 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory/bulk_100 - B/op",
            "value": 350076,
            "unit": "B/op",
            "extra": "82 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory/bulk_100 - allocs/op",
            "value": 1655,
            "unit": "allocs/op",
            "extra": "82 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory/subjects_one",
            "value": 1012892,
            "unit": "ns/op\t    3237 B/op\t      32 allocs/op",
            "extra": "352 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory/subjects_one - ns/op",
            "value": 1012892,
            "unit": "ns/op",
            "extra": "352 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory/subjects_one - B/op",
            "value": 3237,
            "unit": "B/op",
            "extra": "352 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory/subjects_one - allocs/op",
            "value": 32,
            "unit": "allocs/op",
            "extra": "352 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory/toggle_team_edge",
            "value": 11012473,
            "unit": "ns/op\t15739821 B/op\t     271 allocs/op",
            "extra": "30 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory/toggle_team_edge - ns/op",
            "value": 11012473,
            "unit": "ns/op",
            "extra": "30 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory/toggle_team_edge - B/op",
            "value": 15739821,
            "unit": "B/op",
            "extra": "30 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory/toggle_team_edge - allocs/op",
            "value": 271,
            "unit": "allocs/op",
            "extra": "30 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory+index/lookup",
            "value": 523595,
            "unit": "ns/op\t  517538 B/op\t      73 allocs/op",
            "extra": "638 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory+index/lookup - ns/op",
            "value": 523595,
            "unit": "ns/op",
            "extra": "638 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory+index/lookup - B/op",
            "value": 517538,
            "unit": "B/op",
            "extra": "638 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory+index/lookup - allocs/op",
            "value": 73,
            "unit": "allocs/op",
            "extra": "638 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory+index/check_hit",
            "value": 1677,
            "unit": "ns/op\t    1017 B/op\t      11 allocs/op",
            "extra": "229304 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory+index/check_hit - ns/op",
            "value": 1677,
            "unit": "ns/op",
            "extra": "229304 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory+index/check_hit - B/op",
            "value": 1017,
            "unit": "B/op",
            "extra": "229304 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory+index/check_hit - allocs/op",
            "value": 11,
            "unit": "allocs/op",
            "extra": "229304 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory+index/check_miss",
            "value": 1639,
            "unit": "ns/op\t     921 B/op\t      10 allocs/op",
            "extra": "231820 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory+index/check_miss - ns/op",
            "value": 1639,
            "unit": "ns/op",
            "extra": "231820 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory+index/check_miss - B/op",
            "value": 921,
            "unit": "B/op",
            "extra": "231820 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory+index/check_miss - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "231820 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory+index/bulk_100",
            "value": 530086,
            "unit": "ns/op\t  593505 B/op\t     368 allocs/op",
            "extra": "813 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory+index/bulk_100 - ns/op",
            "value": 530086,
            "unit": "ns/op",
            "extra": "813 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory+index/bulk_100 - B/op",
            "value": 593505,
            "unit": "B/op",
            "extra": "813 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory+index/bulk_100 - allocs/op",
            "value": 368,
            "unit": "allocs/op",
            "extra": "813 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory+index/subjects_one",
            "value": 2196,
            "unit": "ns/op\t    1704 B/op\t      18 allocs/op",
            "extra": "196563 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory+index/subjects_one - ns/op",
            "value": 2196,
            "unit": "ns/op",
            "extra": "196563 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory+index/subjects_one - B/op",
            "value": 1704,
            "unit": "B/op",
            "extra": "196563 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory+index/subjects_one - allocs/op",
            "value": 18,
            "unit": "allocs/op",
            "extra": "196563 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory+index/toggle_team_edge",
            "value": 11105339,
            "unit": "ns/op\t15740885 B/op\t     271 allocs/op",
            "extra": "31 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory+index/toggle_team_edge - ns/op",
            "value": 11105339,
            "unit": "ns/op",
            "extra": "31 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory+index/toggle_team_edge - B/op",
            "value": 15740885,
            "unit": "B/op",
            "extra": "31 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=memory+index/toggle_team_edge - allocs/op",
            "value": 271,
            "unit": "allocs/op",
            "extra": "31 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres/lookup",
            "value": 8928876,
            "unit": "ns/op\t 2645927 B/op\t   34733 allocs/op",
            "extra": "37 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres/lookup - ns/op",
            "value": 8928876,
            "unit": "ns/op",
            "extra": "37 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres/lookup - B/op",
            "value": 2645927,
            "unit": "B/op",
            "extra": "37 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres/lookup - allocs/op",
            "value": 34733,
            "unit": "allocs/op",
            "extra": "37 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres/check_hit",
            "value": 503889,
            "unit": "ns/op\t    5690 B/op\t      99 allocs/op",
            "extra": "829 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres/check_hit - ns/op",
            "value": 503889,
            "unit": "ns/op",
            "extra": "829 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres/check_hit - B/op",
            "value": 5690,
            "unit": "B/op",
            "extra": "829 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres/check_hit - allocs/op",
            "value": 99,
            "unit": "allocs/op",
            "extra": "829 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres/check_miss",
            "value": 390821,
            "unit": "ns/op\t    5025 B/op\t      81 allocs/op",
            "extra": "850 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres/check_miss - ns/op",
            "value": 390821,
            "unit": "ns/op",
            "extra": "850 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres/check_miss - B/op",
            "value": 5025,
            "unit": "B/op",
            "extra": "850 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres/check_miss - allocs/op",
            "value": 81,
            "unit": "allocs/op",
            "extra": "850 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres/bulk_100",
            "value": 1805368,
            "unit": "ns/op\t  415969 B/op\t    3859 allocs/op",
            "extra": "193 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres/bulk_100 - ns/op",
            "value": 1805368,
            "unit": "ns/op",
            "extra": "193 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres/bulk_100 - B/op",
            "value": 415969,
            "unit": "B/op",
            "extra": "193 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres/bulk_100 - allocs/op",
            "value": 3859,
            "unit": "allocs/op",
            "extra": "193 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres/subjects_one",
            "value": 459991,
            "unit": "ns/op\t    6052 B/op\t      93 allocs/op",
            "extra": "969 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres/subjects_one - ns/op",
            "value": 459991,
            "unit": "ns/op",
            "extra": "969 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres/subjects_one - B/op",
            "value": 6052,
            "unit": "B/op",
            "extra": "969 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres/subjects_one - allocs/op",
            "value": 93,
            "unit": "allocs/op",
            "extra": "969 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres/toggle_team_edge",
            "value": 9578956,
            "unit": "ns/op\t   11508 B/op\t     148 allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres/toggle_team_edge - ns/op",
            "value": 9578956,
            "unit": "ns/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres/toggle_team_edge - B/op",
            "value": 11508,
            "unit": "B/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres/toggle_team_edge - allocs/op",
            "value": 148,
            "unit": "allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+closure/lookup",
            "value": 2391781,
            "unit": "ns/op\t  340160 B/op\t    3332 allocs/op",
            "extra": "147 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+closure/lookup - ns/op",
            "value": 2391781,
            "unit": "ns/op",
            "extra": "147 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+closure/lookup - B/op",
            "value": 340160,
            "unit": "B/op",
            "extra": "147 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+closure/lookup - allocs/op",
            "value": 3332,
            "unit": "allocs/op",
            "extra": "147 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+closure/check_hit",
            "value": 585244,
            "unit": "ns/op\t    5959 B/op\t      97 allocs/op",
            "extra": "670 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+closure/check_hit - ns/op",
            "value": 585244,
            "unit": "ns/op",
            "extra": "670 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+closure/check_hit - B/op",
            "value": 5959,
            "unit": "B/op",
            "extra": "670 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+closure/check_hit - allocs/op",
            "value": 97,
            "unit": "allocs/op",
            "extra": "670 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+closure/check_miss",
            "value": 897582,
            "unit": "ns/op\t    9980 B/op\t     162 allocs/op",
            "extra": "424 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+closure/check_miss - ns/op",
            "value": 897582,
            "unit": "ns/op",
            "extra": "424 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+closure/check_miss - B/op",
            "value": 9980,
            "unit": "B/op",
            "extra": "424 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+closure/check_miss - allocs/op",
            "value": 162,
            "unit": "allocs/op",
            "extra": "424 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+closure/bulk_100",
            "value": 2140875,
            "unit": "ns/op\t  181268 B/op\t    1685 allocs/op",
            "extra": "172 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+closure/bulk_100 - ns/op",
            "value": 2140875,
            "unit": "ns/op",
            "extra": "172 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+closure/bulk_100 - B/op",
            "value": 181268,
            "unit": "B/op",
            "extra": "172 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+closure/bulk_100 - allocs/op",
            "value": 1685,
            "unit": "allocs/op",
            "extra": "172 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+closure/subjects_one",
            "value": 838779,
            "unit": "ns/op\t    9341 B/op\t     158 allocs/op",
            "extra": "427 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+closure/subjects_one - ns/op",
            "value": 838779,
            "unit": "ns/op",
            "extra": "427 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+closure/subjects_one - B/op",
            "value": 9341,
            "unit": "B/op",
            "extra": "427 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+closure/subjects_one - allocs/op",
            "value": 158,
            "unit": "allocs/op",
            "extra": "427 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+closure/toggle_team_edge",
            "value": 47118718,
            "unit": "ns/op\t   17806 B/op\t     272 allocs/op",
            "extra": "30 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+closure/toggle_team_edge - ns/op",
            "value": 47118718,
            "unit": "ns/op",
            "extra": "30 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+closure/toggle_team_edge - B/op",
            "value": 17806,
            "unit": "B/op",
            "extra": "30 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+closure/toggle_team_edge - allocs/op",
            "value": 272,
            "unit": "allocs/op",
            "extra": "30 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+sets/lookup",
            "value": 2254100,
            "unit": "ns/op\t  229855 B/op\t    3275 allocs/op",
            "extra": "159 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+sets/lookup - ns/op",
            "value": 2254100,
            "unit": "ns/op",
            "extra": "159 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+sets/lookup - B/op",
            "value": 229855,
            "unit": "B/op",
            "extra": "159 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+sets/lookup - allocs/op",
            "value": 3275,
            "unit": "allocs/op",
            "extra": "159 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+sets/check_hit",
            "value": 1169730,
            "unit": "ns/op\t    6115 B/op\t      77 allocs/op",
            "extra": "331 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+sets/check_hit - ns/op",
            "value": 1169730,
            "unit": "ns/op",
            "extra": "331 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+sets/check_hit - B/op",
            "value": 6115,
            "unit": "B/op",
            "extra": "331 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+sets/check_hit - allocs/op",
            "value": 77,
            "unit": "allocs/op",
            "extra": "331 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+sets/check_miss",
            "value": 1122318,
            "unit": "ns/op\t    5855 B/op\t      77 allocs/op",
            "extra": "306 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+sets/check_miss - ns/op",
            "value": 1122318,
            "unit": "ns/op",
            "extra": "306 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+sets/check_miss - B/op",
            "value": 5855,
            "unit": "B/op",
            "extra": "306 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+sets/check_miss - allocs/op",
            "value": 77,
            "unit": "allocs/op",
            "extra": "306 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+sets/bulk_100",
            "value": 2638114,
            "unit": "ns/op\t   75360 B/op\t     947 allocs/op",
            "extra": "140 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+sets/bulk_100 - ns/op",
            "value": 2638114,
            "unit": "ns/op",
            "extra": "140 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+sets/bulk_100 - B/op",
            "value": 75360,
            "unit": "B/op",
            "extra": "140 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+sets/bulk_100 - allocs/op",
            "value": 947,
            "unit": "allocs/op",
            "extra": "140 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+sets/subjects_one",
            "value": 674982,
            "unit": "ns/op\t    3822 B/op\t      82 allocs/op",
            "extra": "532 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+sets/subjects_one - ns/op",
            "value": 674982,
            "unit": "ns/op",
            "extra": "532 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+sets/subjects_one - B/op",
            "value": 3822,
            "unit": "B/op",
            "extra": "532 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+sets/subjects_one - allocs/op",
            "value": 82,
            "unit": "allocs/op",
            "extra": "532 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+sets/toggle_team_edge",
            "value": 22448255,
            "unit": "ns/op\t   36558 B/op\t     449 allocs/op",
            "extra": "25 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+sets/toggle_team_edge - ns/op",
            "value": 22448255,
            "unit": "ns/op",
            "extra": "25 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+sets/toggle_team_edge - B/op",
            "value": 36558,
            "unit": "B/op",
            "extra": "25 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=postgres+sets/toggle_team_edge - allocs/op",
            "value": 449,
            "unit": "allocs/op",
            "extra": "25 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-memdb/lookup",
            "value": 6249817,
            "unit": "ns/op\t 1022403 B/op\t   10906 allocs/op",
            "extra": "52 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-memdb/lookup - ns/op",
            "value": 6249817,
            "unit": "ns/op",
            "extra": "52 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-memdb/lookup - B/op",
            "value": 1022403,
            "unit": "B/op",
            "extra": "52 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-memdb/lookup - allocs/op",
            "value": 10906,
            "unit": "allocs/op",
            "extra": "52 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-memdb/check_hit",
            "value": 331362,
            "unit": "ns/op\t    7395 B/op\t     108 allocs/op",
            "extra": "1084 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-memdb/check_hit - ns/op",
            "value": 331362,
            "unit": "ns/op",
            "extra": "1084 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-memdb/check_hit - B/op",
            "value": 7395,
            "unit": "B/op",
            "extra": "1084 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-memdb/check_hit - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "1084 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-memdb/check_miss",
            "value": 327554,
            "unit": "ns/op\t    7405 B/op\t     108 allocs/op",
            "extra": "933 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-memdb/check_miss - ns/op",
            "value": 327554,
            "unit": "ns/op",
            "extra": "933 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-memdb/check_miss - B/op",
            "value": 7405,
            "unit": "B/op",
            "extra": "933 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-memdb/check_miss - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "933 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-memdb/bulk_100",
            "value": 1149421,
            "unit": "ns/op\t   99135 B/op\t    1711 allocs/op",
            "extra": "284 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-memdb/bulk_100 - ns/op",
            "value": 1149421,
            "unit": "ns/op",
            "extra": "284 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-memdb/bulk_100 - B/op",
            "value": 99135,
            "unit": "B/op",
            "extra": "284 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-memdb/bulk_100 - allocs/op",
            "value": 1711,
            "unit": "allocs/op",
            "extra": "284 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-memdb/subjects_one",
            "value": 348691,
            "unit": "ns/op\t    8979 B/op\t     138 allocs/op",
            "extra": "964 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-memdb/subjects_one - ns/op",
            "value": 348691,
            "unit": "ns/op",
            "extra": "964 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-memdb/subjects_one - B/op",
            "value": 8979,
            "unit": "B/op",
            "extra": "964 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-memdb/subjects_one - allocs/op",
            "value": 138,
            "unit": "allocs/op",
            "extra": "964 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-memdb/toggle_team_edge",
            "value": 872470,
            "unit": "ns/op\t   15236 B/op\t     224 allocs/op",
            "extra": "436 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-memdb/toggle_team_edge - ns/op",
            "value": 872470,
            "unit": "ns/op",
            "extra": "436 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-memdb/toggle_team_edge - B/op",
            "value": 15236,
            "unit": "B/op",
            "extra": "436 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-memdb/toggle_team_edge - allocs/op",
            "value": 224,
            "unit": "allocs/op",
            "extra": "436 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-postgres/lookup",
            "value": 5842889,
            "unit": "ns/op\t  941152 B/op\t   10928 allocs/op",
            "extra": "57 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-postgres/lookup - ns/op",
            "value": 5842889,
            "unit": "ns/op",
            "extra": "57 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-postgres/lookup - B/op",
            "value": 941152,
            "unit": "B/op",
            "extra": "57 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-postgres/lookup - allocs/op",
            "value": 10928,
            "unit": "allocs/op",
            "extra": "57 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-postgres/check_hit",
            "value": 584444,
            "unit": "ns/op\t    7298 B/op\t     108 allocs/op",
            "extra": "559 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-postgres/check_hit - ns/op",
            "value": 584444,
            "unit": "ns/op",
            "extra": "559 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-postgres/check_hit - B/op",
            "value": 7298,
            "unit": "B/op",
            "extra": "559 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-postgres/check_hit - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "559 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-postgres/check_miss",
            "value": 593979,
            "unit": "ns/op\t    7352 B/op\t     108 allocs/op",
            "extra": "583 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-postgres/check_miss - ns/op",
            "value": 593979,
            "unit": "ns/op",
            "extra": "583 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-postgres/check_miss - B/op",
            "value": 7352,
            "unit": "B/op",
            "extra": "583 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-postgres/check_miss - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "583 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-postgres/bulk_100",
            "value": 1424362,
            "unit": "ns/op\t   99279 B/op\t    1711 allocs/op",
            "extra": "246 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-postgres/bulk_100 - ns/op",
            "value": 1424362,
            "unit": "ns/op",
            "extra": "246 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-postgres/bulk_100 - B/op",
            "value": 99279,
            "unit": "B/op",
            "extra": "246 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-postgres/bulk_100 - allocs/op",
            "value": 1711,
            "unit": "allocs/op",
            "extra": "246 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-postgres/subjects_one",
            "value": 615494,
            "unit": "ns/op\t    8881 B/op\t     138 allocs/op",
            "extra": "559 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-postgres/subjects_one - ns/op",
            "value": 615494,
            "unit": "ns/op",
            "extra": "559 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-postgres/subjects_one - B/op",
            "value": 8881,
            "unit": "B/op",
            "extra": "559 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-postgres/subjects_one - allocs/op",
            "value": 138,
            "unit": "allocs/op",
            "extra": "559 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-postgres/toggle_team_edge",
            "value": 19929908,
            "unit": "ns/op\t   16463 B/op\t     227 allocs/op",
            "extra": "87 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-postgres/toggle_team_edge - ns/op",
            "value": 19929908,
            "unit": "ns/op",
            "extra": "87 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-postgres/toggle_team_edge - B/op",
            "value": 16463,
            "unit": "B/op",
            "extra": "87 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=10000/density=10/path=team/kind=spicedb-postgres/toggle_team_edge - allocs/op",
            "value": 227,
            "unit": "allocs/op",
            "extra": "87 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory/lookup",
            "value": 151372690,
            "unit": "ns/op\t22495724 B/op\t     632 allocs/op",
            "extra": "2 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory/lookup - ns/op",
            "value": 151372690,
            "unit": "ns/op",
            "extra": "2 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory/lookup - B/op",
            "value": 22495724,
            "unit": "B/op",
            "extra": "2 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory/lookup - allocs/op",
            "value": 632,
            "unit": "allocs/op",
            "extra": "2 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory/check_hit",
            "value": 4871092,
            "unit": "ns/op\t    1864 B/op\t      17 allocs/op",
            "extra": "68 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory/check_hit - ns/op",
            "value": 4871092,
            "unit": "ns/op",
            "extra": "68 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory/check_hit - B/op",
            "value": 1864,
            "unit": "B/op",
            "extra": "68 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory/check_hit - allocs/op",
            "value": 17,
            "unit": "allocs/op",
            "extra": "68 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory/check_miss",
            "value": 9893932,
            "unit": "ns/op\t    2974 B/op\t      20 allocs/op",
            "extra": "36 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory/check_miss - ns/op",
            "value": 9893932,
            "unit": "ns/op",
            "extra": "36 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory/check_miss - B/op",
            "value": 2974,
            "unit": "B/op",
            "extra": "36 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory/check_miss - allocs/op",
            "value": 20,
            "unit": "allocs/op",
            "extra": "36 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory/bulk_100",
            "value": 33367369,
            "unit": "ns/op\t  323867 B/op\t    1336 allocs/op",
            "extra": "9 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory/bulk_100 - ns/op",
            "value": 33367369,
            "unit": "ns/op",
            "extra": "9 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory/bulk_100 - B/op",
            "value": 323867,
            "unit": "B/op",
            "extra": "9 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory/bulk_100 - allocs/op",
            "value": 1336,
            "unit": "allocs/op",
            "extra": "9 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory/subjects_one",
            "value": 10211932,
            "unit": "ns/op\t    4147 B/op\t      32 allocs/op",
            "extra": "34 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory/subjects_one - ns/op",
            "value": 10211932,
            "unit": "ns/op",
            "extra": "34 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory/subjects_one - B/op",
            "value": 4147,
            "unit": "B/op",
            "extra": "34 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory/subjects_one - allocs/op",
            "value": 32,
            "unit": "allocs/op",
            "extra": "34 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory/toggle_grant",
            "value": 134326353,
            "unit": "ns/op\t125898042 B/op\t    2066 allocs/op",
            "extra": "3 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory/toggle_grant - ns/op",
            "value": 134326353,
            "unit": "ns/op",
            "extra": "3 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory/toggle_grant - B/op",
            "value": 125898042,
            "unit": "B/op",
            "extra": "3 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory/toggle_grant - allocs/op",
            "value": 2066,
            "unit": "allocs/op",
            "extra": "3 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory+index/lookup",
            "value": 1381964375,
            "unit": "ns/op\t1129676200 B/op\t10893132 allocs/op",
            "extra": "1 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory+index/lookup - ns/op",
            "value": 1381964375,
            "unit": "ns/op",
            "extra": "1 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory+index/lookup - B/op",
            "value": 1129676200,
            "unit": "B/op",
            "extra": "1 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory+index/lookup - allocs/op",
            "value": 10893132,
            "unit": "allocs/op",
            "extra": "1 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory+index/check_hit",
            "value": 1502,
            "unit": "ns/op\t     921 B/op\t      10 allocs/op",
            "extra": "246355 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory+index/check_hit - ns/op",
            "value": 1502,
            "unit": "ns/op",
            "extra": "246355 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory+index/check_hit - B/op",
            "value": 921,
            "unit": "B/op",
            "extra": "246355 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory+index/check_hit - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "246355 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory+index/check_miss",
            "value": 1570,
            "unit": "ns/op\t     921 B/op\t      10 allocs/op",
            "extra": "236617 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory+index/check_miss - ns/op",
            "value": 1570,
            "unit": "ns/op",
            "extra": "236617 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory+index/check_miss - B/op",
            "value": 921,
            "unit": "B/op",
            "extra": "236617 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory+index/check_miss - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "236617 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory+index/bulk_100",
            "value": 4246084,
            "unit": "ns/op\t 4259483 B/op\t     466 allocs/op",
            "extra": "91 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory+index/bulk_100 - ns/op",
            "value": 4246084,
            "unit": "ns/op",
            "extra": "91 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory+index/bulk_100 - B/op",
            "value": 4259483,
            "unit": "B/op",
            "extra": "91 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory+index/bulk_100 - allocs/op",
            "value": 466,
            "unit": "allocs/op",
            "extra": "91 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory+index/subjects_one",
            "value": 2313,
            "unit": "ns/op\t    1704 B/op\t      18 allocs/op",
            "extra": "200137 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory+index/subjects_one - ns/op",
            "value": 2313,
            "unit": "ns/op",
            "extra": "200137 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory+index/subjects_one - B/op",
            "value": 1704,
            "unit": "B/op",
            "extra": "200137 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory+index/subjects_one - allocs/op",
            "value": 18,
            "unit": "allocs/op",
            "extra": "200137 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory+index/toggle_grant",
            "value": 175173556,
            "unit": "ns/op\t125891636 B/op\t    2065 allocs/op",
            "extra": "2 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory+index/toggle_grant - ns/op",
            "value": 175173556,
            "unit": "ns/op",
            "extra": "2 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory+index/toggle_grant - B/op",
            "value": 125891636,
            "unit": "B/op",
            "extra": "2 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=memory+index/toggle_grant - allocs/op",
            "value": 2065,
            "unit": "allocs/op",
            "extra": "2 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres/lookup",
            "value": 66935134,
            "unit": "ns/op\t31422588 B/op\t  279241 allocs/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres/lookup - ns/op",
            "value": 66935134,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres/lookup - B/op",
            "value": 31422588,
            "unit": "B/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres/lookup - allocs/op",
            "value": 279241,
            "unit": "allocs/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres/check_hit",
            "value": 355267,
            "unit": "ns/op\t    4078 B/op\t      67 allocs/op",
            "extra": "1261 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres/check_hit - ns/op",
            "value": 355267,
            "unit": "ns/op",
            "extra": "1261 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres/check_hit - B/op",
            "value": 4078,
            "unit": "B/op",
            "extra": "1261 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres/check_hit - allocs/op",
            "value": 67,
            "unit": "allocs/op",
            "extra": "1261 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres/check_miss",
            "value": 436610,
            "unit": "ns/op\t    4981 B/op\t      81 allocs/op",
            "extra": "892 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres/check_miss - ns/op",
            "value": 436610,
            "unit": "ns/op",
            "extra": "892 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres/check_miss - B/op",
            "value": 4981,
            "unit": "B/op",
            "extra": "892 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres/check_miss - allocs/op",
            "value": 81,
            "unit": "allocs/op",
            "extra": "892 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres/bulk_100",
            "value": 1673975,
            "unit": "ns/op\t  397841 B/op\t    3746 allocs/op",
            "extra": "225 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres/bulk_100 - ns/op",
            "value": 1673975,
            "unit": "ns/op",
            "extra": "225 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres/bulk_100 - B/op",
            "value": 397841,
            "unit": "B/op",
            "extra": "225 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres/bulk_100 - allocs/op",
            "value": 3746,
            "unit": "allocs/op",
            "extra": "225 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres/subjects_one",
            "value": 448411,
            "unit": "ns/op\t    6052 B/op\t      93 allocs/op",
            "extra": "876 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres/subjects_one - ns/op",
            "value": 448411,
            "unit": "ns/op",
            "extra": "876 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres/subjects_one - B/op",
            "value": 6052,
            "unit": "B/op",
            "extra": "876 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres/subjects_one - allocs/op",
            "value": 93,
            "unit": "allocs/op",
            "extra": "876 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres/toggle_grant",
            "value": 4989955,
            "unit": "ns/op\t   11444 B/op\t     144 allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres/toggle_grant - ns/op",
            "value": 4989955,
            "unit": "ns/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres/toggle_grant - B/op",
            "value": 11444,
            "unit": "B/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres/toggle_grant - allocs/op",
            "value": 144,
            "unit": "allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+closure/lookup",
            "value": 15622968,
            "unit": "ns/op\t 2978190 B/op\t   30108 allocs/op",
            "extra": "21 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+closure/lookup - ns/op",
            "value": 15622968,
            "unit": "ns/op",
            "extra": "21 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+closure/lookup - B/op",
            "value": 2978190,
            "unit": "B/op",
            "extra": "21 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+closure/lookup - allocs/op",
            "value": 30108,
            "unit": "allocs/op",
            "extra": "21 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+closure/check_hit",
            "value": 542407,
            "unit": "ns/op\t    5978 B/op\t      97 allocs/op",
            "extra": "592 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+closure/check_hit - ns/op",
            "value": 542407,
            "unit": "ns/op",
            "extra": "592 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+closure/check_hit - B/op",
            "value": 5978,
            "unit": "B/op",
            "extra": "592 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+closure/check_hit - allocs/op",
            "value": 97,
            "unit": "allocs/op",
            "extra": "592 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+closure/check_miss",
            "value": 825273,
            "unit": "ns/op\t    9784 B/op\t     162 allocs/op",
            "extra": "404 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+closure/check_miss - ns/op",
            "value": 825273,
            "unit": "ns/op",
            "extra": "404 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+closure/check_miss - B/op",
            "value": 9784,
            "unit": "B/op",
            "extra": "404 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+closure/check_miss - allocs/op",
            "value": 162,
            "unit": "allocs/op",
            "extra": "404 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+closure/bulk_100",
            "value": 2874389,
            "unit": "ns/op\t  168496 B/op\t    1629 allocs/op",
            "extra": "126 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+closure/bulk_100 - ns/op",
            "value": 2874389,
            "unit": "ns/op",
            "extra": "126 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+closure/bulk_100 - B/op",
            "value": 168496,
            "unit": "B/op",
            "extra": "126 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+closure/bulk_100 - allocs/op",
            "value": 1629,
            "unit": "allocs/op",
            "extra": "126 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+closure/subjects_one",
            "value": 864736,
            "unit": "ns/op\t    9343 B/op\t     158 allocs/op",
            "extra": "422 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+closure/subjects_one - ns/op",
            "value": 864736,
            "unit": "ns/op",
            "extra": "422 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+closure/subjects_one - B/op",
            "value": 9343,
            "unit": "B/op",
            "extra": "422 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+closure/subjects_one - allocs/op",
            "value": 158,
            "unit": "allocs/op",
            "extra": "422 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+closure/toggle_grant",
            "value": 6973721,
            "unit": "ns/op\t   10033 B/op\t     144 allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+closure/toggle_grant - ns/op",
            "value": 6973721,
            "unit": "ns/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+closure/toggle_grant - B/op",
            "value": 10033,
            "unit": "B/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+closure/toggle_grant - allocs/op",
            "value": 144,
            "unit": "allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+sets/lookup",
            "value": 17563619,
            "unit": "ns/op\t 2112364 B/op\t   29995 allocs/op",
            "extra": "18 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+sets/lookup - ns/op",
            "value": 17563619,
            "unit": "ns/op",
            "extra": "18 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+sets/lookup - B/op",
            "value": 2112364,
            "unit": "B/op",
            "extra": "18 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+sets/lookup - allocs/op",
            "value": 29995,
            "unit": "allocs/op",
            "extra": "18 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+sets/check_hit",
            "value": 734536,
            "unit": "ns/op\t    5855 B/op\t      77 allocs/op",
            "extra": "512 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+sets/check_hit - ns/op",
            "value": 734536,
            "unit": "ns/op",
            "extra": "512 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+sets/check_hit - B/op",
            "value": 5855,
            "unit": "B/op",
            "extra": "512 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+sets/check_hit - allocs/op",
            "value": 77,
            "unit": "allocs/op",
            "extra": "512 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+sets/check_miss",
            "value": 719299,
            "unit": "ns/op\t    5937 B/op\t      77 allocs/op",
            "extra": "532 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+sets/check_miss - ns/op",
            "value": 719299,
            "unit": "ns/op",
            "extra": "532 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+sets/check_miss - B/op",
            "value": 5937,
            "unit": "B/op",
            "extra": "532 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+sets/check_miss - allocs/op",
            "value": 77,
            "unit": "allocs/op",
            "extra": "532 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+sets/bulk_100",
            "value": 8894726,
            "unit": "ns/op\t   71057 B/op\t     901 allocs/op",
            "extra": "38 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+sets/bulk_100 - ns/op",
            "value": 8894726,
            "unit": "ns/op",
            "extra": "38 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+sets/bulk_100 - B/op",
            "value": 71057,
            "unit": "B/op",
            "extra": "38 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+sets/bulk_100 - allocs/op",
            "value": 901,
            "unit": "allocs/op",
            "extra": "38 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+sets/subjects_one",
            "value": 591158,
            "unit": "ns/op\t    3881 B/op\t      82 allocs/op",
            "extra": "674 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+sets/subjects_one - ns/op",
            "value": 591158,
            "unit": "ns/op",
            "extra": "674 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+sets/subjects_one - B/op",
            "value": 3881,
            "unit": "B/op",
            "extra": "674 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+sets/subjects_one - allocs/op",
            "value": 82,
            "unit": "allocs/op",
            "extra": "674 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+sets/toggle_grant",
            "value": 14575058,
            "unit": "ns/op\t   23085 B/op\t     331 allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+sets/toggle_grant - ns/op",
            "value": 14575058,
            "unit": "ns/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+sets/toggle_grant - B/op",
            "value": 23085,
            "unit": "B/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=postgres+sets/toggle_grant - allocs/op",
            "value": 331,
            "unit": "allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-memdb/lookup",
            "value": 48044748,
            "unit": "ns/op\t 9408718 B/op\t  101142 allocs/op",
            "extra": "7 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-memdb/lookup - ns/op",
            "value": 48044748,
            "unit": "ns/op",
            "extra": "7 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-memdb/lookup - B/op",
            "value": 9408718,
            "unit": "B/op",
            "extra": "7 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-memdb/lookup - allocs/op",
            "value": 101142,
            "unit": "allocs/op",
            "extra": "7 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-memdb/check_hit",
            "value": 355578,
            "unit": "ns/op\t    7336 B/op\t     108 allocs/op",
            "extra": "957 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-memdb/check_hit - ns/op",
            "value": 355578,
            "unit": "ns/op",
            "extra": "957 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-memdb/check_hit - B/op",
            "value": 7336,
            "unit": "B/op",
            "extra": "957 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-memdb/check_hit - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "957 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-memdb/check_miss",
            "value": 345372,
            "unit": "ns/op\t    7371 B/op\t     108 allocs/op",
            "extra": "1002 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-memdb/check_miss - ns/op",
            "value": 345372,
            "unit": "ns/op",
            "extra": "1002 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-memdb/check_miss - B/op",
            "value": 7371,
            "unit": "B/op",
            "extra": "1002 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-memdb/check_miss - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "1002 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-memdb/bulk_100",
            "value": 344019748,
            "unit": "ns/op\t  123296 B/op\t    1731 allocs/op",
            "extra": "1 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-memdb/bulk_100 - ns/op",
            "value": 344019748,
            "unit": "ns/op",
            "extra": "1 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-memdb/bulk_100 - B/op",
            "value": 123296,
            "unit": "B/op",
            "extra": "1 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-memdb/bulk_100 - allocs/op",
            "value": 1731,
            "unit": "allocs/op",
            "extra": "1 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-memdb/subjects_one",
            "value": 404170,
            "unit": "ns/op\t    9089 B/op\t     138 allocs/op",
            "extra": "1009 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-memdb/subjects_one - ns/op",
            "value": 404170,
            "unit": "ns/op",
            "extra": "1009 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-memdb/subjects_one - B/op",
            "value": 9089,
            "unit": "B/op",
            "extra": "1009 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-memdb/subjects_one - allocs/op",
            "value": 138,
            "unit": "allocs/op",
            "extra": "1009 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-memdb/toggle_grant",
            "value": 793240,
            "unit": "ns/op\t   15167 B/op\t     225 allocs/op",
            "extra": "453 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-memdb/toggle_grant - ns/op",
            "value": 793240,
            "unit": "ns/op",
            "extra": "453 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-memdb/toggle_grant - B/op",
            "value": 15167,
            "unit": "B/op",
            "extra": "453 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-memdb/toggle_grant - allocs/op",
            "value": 225,
            "unit": "allocs/op",
            "extra": "453 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-postgres/lookup",
            "value": 45485155,
            "unit": "ns/op\t 8403090 B/op\t  101548 allocs/op",
            "extra": "7 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-postgres/lookup - ns/op",
            "value": 45485155,
            "unit": "ns/op",
            "extra": "7 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-postgres/lookup - B/op",
            "value": 8403090,
            "unit": "B/op",
            "extra": "7 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-postgres/lookup - allocs/op",
            "value": 101548,
            "unit": "allocs/op",
            "extra": "7 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-postgres/check_hit",
            "value": 588337,
            "unit": "ns/op\t    7352 B/op\t     108 allocs/op",
            "extra": "600 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-postgres/check_hit - ns/op",
            "value": 588337,
            "unit": "ns/op",
            "extra": "600 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-postgres/check_hit - B/op",
            "value": 7352,
            "unit": "B/op",
            "extra": "600 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-postgres/check_hit - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "600 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-postgres/check_miss",
            "value": 588747,
            "unit": "ns/op\t    7296 B/op\t     108 allocs/op",
            "extra": "598 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-postgres/check_miss - ns/op",
            "value": 588747,
            "unit": "ns/op",
            "extra": "598 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-postgres/check_miss - B/op",
            "value": 7296,
            "unit": "B/op",
            "extra": "598 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-postgres/check_miss - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "598 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-postgres/bulk_100",
            "value": 1404621,
            "unit": "ns/op\t   99060 B/op\t    1711 allocs/op",
            "extra": "262 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-postgres/bulk_100 - ns/op",
            "value": 1404621,
            "unit": "ns/op",
            "extra": "262 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-postgres/bulk_100 - B/op",
            "value": 99060,
            "unit": "B/op",
            "extra": "262 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-postgres/bulk_100 - allocs/op",
            "value": 1711,
            "unit": "allocs/op",
            "extra": "262 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-postgres/subjects_one",
            "value": 611144,
            "unit": "ns/op\t    8839 B/op\t     138 allocs/op",
            "extra": "532 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-postgres/subjects_one - ns/op",
            "value": 611144,
            "unit": "ns/op",
            "extra": "532 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-postgres/subjects_one - B/op",
            "value": 8839,
            "unit": "B/op",
            "extra": "532 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-postgres/subjects_one - allocs/op",
            "value": 138,
            "unit": "allocs/op",
            "extra": "532 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-postgres/toggle_grant",
            "value": 6389522,
            "unit": "ns/op\t   16095 B/op\t     226 allocs/op",
            "extra": "76 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-postgres/toggle_grant - ns/op",
            "value": 6389522,
            "unit": "ns/op",
            "extra": "76 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-postgres/toggle_grant - B/op",
            "value": 16095,
            "unit": "B/op",
            "extra": "76 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=direct/kind=spicedb-postgres/toggle_grant - allocs/op",
            "value": 226,
            "unit": "allocs/op",
            "extra": "76 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory/lookup",
            "value": 948075685,
            "unit": "ns/op\t245956992 B/op\t    3382 allocs/op",
            "extra": "1 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory/lookup - ns/op",
            "value": 948075685,
            "unit": "ns/op",
            "extra": "1 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory/lookup - B/op",
            "value": 245956992,
            "unit": "B/op",
            "extra": "1 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory/lookup - allocs/op",
            "value": 3382,
            "unit": "allocs/op",
            "extra": "1 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory/check_hit",
            "value": 5761134,
            "unit": "ns/op\t    1867 B/op\t      17 allocs/op",
            "extra": "58 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory/check_hit - ns/op",
            "value": 5761134,
            "unit": "ns/op",
            "extra": "58 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory/check_hit - B/op",
            "value": 1867,
            "unit": "B/op",
            "extra": "58 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory/check_hit - allocs/op",
            "value": 17,
            "unit": "allocs/op",
            "extra": "58 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory/check_miss",
            "value": 11998734,
            "unit": "ns/op\t    1948 B/op\t      20 allocs/op",
            "extra": "30 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory/check_miss - ns/op",
            "value": 11998734,
            "unit": "ns/op",
            "extra": "30 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory/check_miss - B/op",
            "value": 1948,
            "unit": "B/op",
            "extra": "30 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory/check_miss - allocs/op",
            "value": 20,
            "unit": "allocs/op",
            "extra": "30 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory/bulk_100",
            "value": 30202147,
            "unit": "ns/op\t  415398 B/op\t    1471 allocs/op",
            "extra": "12 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory/bulk_100 - ns/op",
            "value": 30202147,
            "unit": "ns/op",
            "extra": "12 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory/bulk_100 - B/op",
            "value": 415398,
            "unit": "B/op",
            "extra": "12 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory/bulk_100 - allocs/op",
            "value": 1471,
            "unit": "allocs/op",
            "extra": "12 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory/subjects_one",
            "value": 11623696,
            "unit": "ns/op\t    3058 B/op\t      32 allocs/op",
            "extra": "30 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory/subjects_one - ns/op",
            "value": 11623696,
            "unit": "ns/op",
            "extra": "30 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory/subjects_one - B/op",
            "value": 3058,
            "unit": "B/op",
            "extra": "30 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory/subjects_one - allocs/op",
            "value": 32,
            "unit": "allocs/op",
            "extra": "30 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory/toggle_grant",
            "value": 150329263,
            "unit": "ns/op\t125898042 B/op\t    2066 allocs/op",
            "extra": "3 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory/toggle_grant - ns/op",
            "value": 150329263,
            "unit": "ns/op",
            "extra": "3 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory/toggle_grant - B/op",
            "value": 125898042,
            "unit": "B/op",
            "extra": "3 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory/toggle_grant - allocs/op",
            "value": 2066,
            "unit": "allocs/op",
            "extra": "3 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory+index/lookup",
            "value": 1795055266,
            "unit": "ns/op\t1308730664 B/op\t11368004 allocs/op",
            "extra": "1 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory+index/lookup - ns/op",
            "value": 1795055266,
            "unit": "ns/op",
            "extra": "1 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory+index/lookup - B/op",
            "value": 1308730664,
            "unit": "B/op",
            "extra": "1 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory+index/lookup - allocs/op",
            "value": 11368004,
            "unit": "allocs/op",
            "extra": "1 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory+index/check_hit",
            "value": 1600,
            "unit": "ns/op\t     921 B/op\t      10 allocs/op",
            "extra": "244953 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory+index/check_hit - ns/op",
            "value": 1600,
            "unit": "ns/op",
            "extra": "244953 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory+index/check_hit - B/op",
            "value": 921,
            "unit": "B/op",
            "extra": "244953 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory+index/check_hit - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "244953 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory+index/check_miss",
            "value": 1518,
            "unit": "ns/op\t     921 B/op\t      10 allocs/op",
            "extra": "240933 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory+index/check_miss - ns/op",
            "value": 1518,
            "unit": "ns/op",
            "extra": "240933 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory+index/check_miss - B/op",
            "value": 921,
            "unit": "B/op",
            "extra": "240933 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory+index/check_miss - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "240933 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory+index/bulk_100",
            "value": 42343878,
            "unit": "ns/op\t33700593 B/op\t    1494 allocs/op",
            "extra": "8 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory+index/bulk_100 - ns/op",
            "value": 42343878,
            "unit": "ns/op",
            "extra": "8 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory+index/bulk_100 - B/op",
            "value": 33700593,
            "unit": "B/op",
            "extra": "8 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory+index/bulk_100 - allocs/op",
            "value": 1494,
            "unit": "allocs/op",
            "extra": "8 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory+index/subjects_one",
            "value": 2146,
            "unit": "ns/op\t    1704 B/op\t      18 allocs/op",
            "extra": "198513 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory+index/subjects_one - ns/op",
            "value": 2146,
            "unit": "ns/op",
            "extra": "198513 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory+index/subjects_one - B/op",
            "value": 1704,
            "unit": "B/op",
            "extra": "198513 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory+index/subjects_one - allocs/op",
            "value": 18,
            "unit": "allocs/op",
            "extra": "198513 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory+index/toggle_grant",
            "value": 172591199,
            "unit": "ns/op\t125910421 B/op\t    2068 allocs/op",
            "extra": "3 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory+index/toggle_grant - ns/op",
            "value": 172591199,
            "unit": "ns/op",
            "extra": "3 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory+index/toggle_grant - B/op",
            "value": 125910421,
            "unit": "B/op",
            "extra": "3 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=memory+index/toggle_grant - allocs/op",
            "value": 2068,
            "unit": "allocs/op",
            "extra": "3 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres/lookup",
            "value": 585536095,
            "unit": "ns/op\t326619360 B/op\t 2523933 allocs/op",
            "extra": "1 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres/lookup - ns/op",
            "value": 585536095,
            "unit": "ns/op",
            "extra": "1 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres/lookup - B/op",
            "value": 326619360,
            "unit": "B/op",
            "extra": "1 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres/lookup - allocs/op",
            "value": 2523933,
            "unit": "allocs/op",
            "extra": "1 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres/check_hit",
            "value": 363608,
            "unit": "ns/op\t    4118 B/op\t      67 allocs/op",
            "extra": "1158 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres/check_hit - ns/op",
            "value": 363608,
            "unit": "ns/op",
            "extra": "1158 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres/check_hit - B/op",
            "value": 4118,
            "unit": "B/op",
            "extra": "1158 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres/check_hit - allocs/op",
            "value": 67,
            "unit": "allocs/op",
            "extra": "1158 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres/check_miss",
            "value": 465223,
            "unit": "ns/op\t    4940 B/op\t      81 allocs/op",
            "extra": "744 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres/check_miss - ns/op",
            "value": 465223,
            "unit": "ns/op",
            "extra": "744 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres/check_miss - B/op",
            "value": 4940,
            "unit": "B/op",
            "extra": "744 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres/check_miss - allocs/op",
            "value": 81,
            "unit": "allocs/op",
            "extra": "744 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres/bulk_100",
            "value": 1619010,
            "unit": "ns/op\t  504962 B/op\t    4346 allocs/op",
            "extra": "223 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres/bulk_100 - ns/op",
            "value": 1619010,
            "unit": "ns/op",
            "extra": "223 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres/bulk_100 - B/op",
            "value": 504962,
            "unit": "B/op",
            "extra": "223 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres/bulk_100 - allocs/op",
            "value": 4346,
            "unit": "allocs/op",
            "extra": "223 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres/subjects_one",
            "value": 420109,
            "unit": "ns/op\t    6051 B/op\t      93 allocs/op",
            "extra": "892 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres/subjects_one - ns/op",
            "value": 420109,
            "unit": "ns/op",
            "extra": "892 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres/subjects_one - B/op",
            "value": 6051,
            "unit": "B/op",
            "extra": "892 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres/subjects_one - allocs/op",
            "value": 93,
            "unit": "allocs/op",
            "extra": "892 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres/toggle_grant",
            "value": 7753134,
            "unit": "ns/op\t   10040 B/op\t     144 allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres/toggle_grant - ns/op",
            "value": 7753134,
            "unit": "ns/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres/toggle_grant - B/op",
            "value": 10040,
            "unit": "B/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres/toggle_grant - allocs/op",
            "value": 144,
            "unit": "allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+closure/lookup",
            "value": 160665596,
            "unit": "ns/op\t26083164 B/op\t  271242 allocs/op",
            "extra": "2 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+closure/lookup - ns/op",
            "value": 160665596,
            "unit": "ns/op",
            "extra": "2 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+closure/lookup - B/op",
            "value": 26083164,
            "unit": "B/op",
            "extra": "2 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+closure/lookup - allocs/op",
            "value": 271242,
            "unit": "allocs/op",
            "extra": "2 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+closure/check_hit",
            "value": 574722,
            "unit": "ns/op\t    5772 B/op\t      97 allocs/op",
            "extra": "724 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+closure/check_hit - ns/op",
            "value": 574722,
            "unit": "ns/op",
            "extra": "724 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+closure/check_hit - B/op",
            "value": 5772,
            "unit": "B/op",
            "extra": "724 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+closure/check_hit - allocs/op",
            "value": 97,
            "unit": "allocs/op",
            "extra": "724 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+closure/check_miss",
            "value": 948446,
            "unit": "ns/op\t    9788 B/op\t     162 allocs/op",
            "extra": "424 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+closure/check_miss - ns/op",
            "value": 948446,
            "unit": "ns/op",
            "extra": "424 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+closure/check_miss - B/op",
            "value": 9788,
            "unit": "B/op",
            "extra": "424 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+closure/check_miss - allocs/op",
            "value": 162,
            "unit": "allocs/op",
            "extra": "424 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+closure/bulk_100",
            "value": 3157405,
            "unit": "ns/op\t  223116 B/op\t    2159 allocs/op",
            "extra": "114 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+closure/bulk_100 - ns/op",
            "value": 3157405,
            "unit": "ns/op",
            "extra": "114 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+closure/bulk_100 - B/op",
            "value": 223116,
            "unit": "B/op",
            "extra": "114 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+closure/bulk_100 - allocs/op",
            "value": 2159,
            "unit": "allocs/op",
            "extra": "114 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+closure/subjects_one",
            "value": 883576,
            "unit": "ns/op\t    9152 B/op\t     158 allocs/op",
            "extra": "414 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+closure/subjects_one - ns/op",
            "value": 883576,
            "unit": "ns/op",
            "extra": "414 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+closure/subjects_one - B/op",
            "value": 9152,
            "unit": "B/op",
            "extra": "414 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+closure/subjects_one - allocs/op",
            "value": 158,
            "unit": "allocs/op",
            "extra": "414 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+closure/toggle_grant",
            "value": 5017472,
            "unit": "ns/op\t   10404 B/op\t     144 allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+closure/toggle_grant - ns/op",
            "value": 5017472,
            "unit": "ns/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+closure/toggle_grant - B/op",
            "value": 10404,
            "unit": "B/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+closure/toggle_grant - allocs/op",
            "value": 144,
            "unit": "allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+sets/lookup",
            "value": 261167110,
            "unit": "ns/op\t19093420 B/op\t  270678 allocs/op",
            "extra": "2 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+sets/lookup - ns/op",
            "value": 261167110,
            "unit": "ns/op",
            "extra": "2 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+sets/lookup - B/op",
            "value": 19093420,
            "unit": "B/op",
            "extra": "2 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+sets/lookup - allocs/op",
            "value": 270678,
            "unit": "allocs/op",
            "extra": "2 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+sets/check_hit",
            "value": 771071,
            "unit": "ns/op\t    5851 B/op\t      77 allocs/op",
            "extra": "458 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+sets/check_hit - ns/op",
            "value": 771071,
            "unit": "ns/op",
            "extra": "458 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+sets/check_hit - B/op",
            "value": 5851,
            "unit": "B/op",
            "extra": "458 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+sets/check_hit - allocs/op",
            "value": 77,
            "unit": "allocs/op",
            "extra": "458 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+sets/check_miss",
            "value": 775371,
            "unit": "ns/op\t    5853 B/op\t      77 allocs/op",
            "extra": "516 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+sets/check_miss - ns/op",
            "value": 775371,
            "unit": "ns/op",
            "extra": "516 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+sets/check_miss - B/op",
            "value": 5853,
            "unit": "B/op",
            "extra": "516 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+sets/check_miss - allocs/op",
            "value": 77,
            "unit": "allocs/op",
            "extra": "516 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+sets/bulk_100",
            "value": 3889684,
            "unit": "ns/op\t  121972 B/op\t    1488 allocs/op",
            "extra": "98 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+sets/bulk_100 - ns/op",
            "value": 3889684,
            "unit": "ns/op",
            "extra": "98 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+sets/bulk_100 - B/op",
            "value": 121972,
            "unit": "B/op",
            "extra": "98 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+sets/bulk_100 - allocs/op",
            "value": 1488,
            "unit": "allocs/op",
            "extra": "98 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+sets/subjects_one",
            "value": 669237,
            "unit": "ns/op\t    3892 B/op\t      82 allocs/op",
            "extra": "583 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+sets/subjects_one - ns/op",
            "value": 669237,
            "unit": "ns/op",
            "extra": "583 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+sets/subjects_one - B/op",
            "value": 3892,
            "unit": "B/op",
            "extra": "583 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+sets/subjects_one - allocs/op",
            "value": 82,
            "unit": "allocs/op",
            "extra": "583 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+sets/toggle_grant",
            "value": 19180487,
            "unit": "ns/op\t   23490 B/op\t     331 allocs/op",
            "extra": "62 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+sets/toggle_grant - ns/op",
            "value": 19180487,
            "unit": "ns/op",
            "extra": "62 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+sets/toggle_grant - B/op",
            "value": 23490,
            "unit": "B/op",
            "extra": "62 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=postgres+sets/toggle_grant - allocs/op",
            "value": 331,
            "unit": "allocs/op",
            "extra": "62 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-memdb/lookup",
            "value": 651567508,
            "unit": "ns/op\t86199760 B/op\t  915439 allocs/op",
            "extra": "1 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-memdb/lookup - ns/op",
            "value": 651567508,
            "unit": "ns/op",
            "extra": "1 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-memdb/lookup - B/op",
            "value": 86199760,
            "unit": "B/op",
            "extra": "1 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-memdb/lookup - allocs/op",
            "value": 915439,
            "unit": "allocs/op",
            "extra": "1 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-memdb/check_hit",
            "value": 325071,
            "unit": "ns/op\t    7361 B/op\t     109 allocs/op",
            "extra": "1087 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-memdb/check_hit - ns/op",
            "value": 325071,
            "unit": "ns/op",
            "extra": "1087 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-memdb/check_hit - B/op",
            "value": 7361,
            "unit": "B/op",
            "extra": "1087 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-memdb/check_hit - allocs/op",
            "value": 109,
            "unit": "allocs/op",
            "extra": "1087 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-memdb/check_miss",
            "value": 324619,
            "unit": "ns/op\t    7335 B/op\t     108 allocs/op",
            "extra": "1094 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-memdb/check_miss - ns/op",
            "value": 324619,
            "unit": "ns/op",
            "extra": "1094 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-memdb/check_miss - B/op",
            "value": 7335,
            "unit": "B/op",
            "extra": "1094 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-memdb/check_miss - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "1094 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-memdb/bulk_100",
            "value": 346246542,
            "unit": "ns/op\t  123600 B/op\t    1734 allocs/op",
            "extra": "1 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-memdb/bulk_100 - ns/op",
            "value": 346246542,
            "unit": "ns/op",
            "extra": "1 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-memdb/bulk_100 - B/op",
            "value": 123600,
            "unit": "B/op",
            "extra": "1 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-memdb/bulk_100 - allocs/op",
            "value": 1734,
            "unit": "allocs/op",
            "extra": "1 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-memdb/subjects_one",
            "value": 346650,
            "unit": "ns/op\t    9058 B/op\t     139 allocs/op",
            "extra": "1016 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-memdb/subjects_one - ns/op",
            "value": 346650,
            "unit": "ns/op",
            "extra": "1016 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-memdb/subjects_one - B/op",
            "value": 9058,
            "unit": "B/op",
            "extra": "1016 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-memdb/subjects_one - allocs/op",
            "value": 139,
            "unit": "allocs/op",
            "extra": "1016 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-memdb/toggle_grant",
            "value": 802995,
            "unit": "ns/op\t   15237 B/op\t     225 allocs/op",
            "extra": "466 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-memdb/toggle_grant - ns/op",
            "value": 802995,
            "unit": "ns/op",
            "extra": "466 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-memdb/toggle_grant - B/op",
            "value": 15237,
            "unit": "B/op",
            "extra": "466 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-memdb/toggle_grant - allocs/op",
            "value": 225,
            "unit": "allocs/op",
            "extra": "466 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-postgres/lookup",
            "value": 640182689,
            "unit": "ns/op\t77227680 B/op\t  916770 allocs/op",
            "extra": "1 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-postgres/lookup - ns/op",
            "value": 640182689,
            "unit": "ns/op",
            "extra": "1 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-postgres/lookup - B/op",
            "value": 77227680,
            "unit": "B/op",
            "extra": "1 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-postgres/lookup - allocs/op",
            "value": 916770,
            "unit": "allocs/op",
            "extra": "1 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-postgres/check_hit",
            "value": 588933,
            "unit": "ns/op\t    7297 B/op\t     108 allocs/op",
            "extra": "564 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-postgres/check_hit - ns/op",
            "value": 588933,
            "unit": "ns/op",
            "extra": "564 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-postgres/check_hit - B/op",
            "value": 7297,
            "unit": "B/op",
            "extra": "564 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-postgres/check_hit - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "564 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-postgres/check_miss",
            "value": 600071,
            "unit": "ns/op\t    7358 B/op\t     108 allocs/op",
            "extra": "540 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-postgres/check_miss - ns/op",
            "value": 600071,
            "unit": "ns/op",
            "extra": "540 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-postgres/check_miss - B/op",
            "value": 7358,
            "unit": "B/op",
            "extra": "540 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-postgres/check_miss - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "540 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-postgres/bulk_100",
            "value": 1424553,
            "unit": "ns/op\t   99194 B/op\t    1711 allocs/op",
            "extra": "247 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-postgres/bulk_100 - ns/op",
            "value": 1424553,
            "unit": "ns/op",
            "extra": "247 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-postgres/bulk_100 - B/op",
            "value": 99194,
            "unit": "B/op",
            "extra": "247 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-postgres/bulk_100 - allocs/op",
            "value": 1711,
            "unit": "allocs/op",
            "extra": "247 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-postgres/subjects_one",
            "value": 596910,
            "unit": "ns/op\t    8896 B/op\t     138 allocs/op",
            "extra": "601 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-postgres/subjects_one - ns/op",
            "value": 596910,
            "unit": "ns/op",
            "extra": "601 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-postgres/subjects_one - B/op",
            "value": 8896,
            "unit": "B/op",
            "extra": "601 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-postgres/subjects_one - allocs/op",
            "value": 138,
            "unit": "allocs/op",
            "extra": "601 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-postgres/toggle_grant",
            "value": 12281500,
            "unit": "ns/op\t   18469 B/op\t     226 allocs/op",
            "extra": "31 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-postgres/toggle_grant - ns/op",
            "value": 12281500,
            "unit": "ns/op",
            "extra": "31 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-postgres/toggle_grant - B/op",
            "value": 18469,
            "unit": "B/op",
            "extra": "31 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=90/path=direct/kind=spicedb-postgres/toggle_grant - allocs/op",
            "value": 226,
            "unit": "allocs/op",
            "extra": "31 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory/lookup",
            "value": 223341788,
            "unit": "ns/op\t75656876 B/op\t 1108144 allocs/op",
            "extra": "2 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory/lookup - ns/op",
            "value": 223341788,
            "unit": "ns/op",
            "extra": "2 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory/lookup - B/op",
            "value": 75656876,
            "unit": "B/op",
            "extra": "2 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory/lookup - allocs/op",
            "value": 1108144,
            "unit": "allocs/op",
            "extra": "2 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory/check_hit",
            "value": 8838293,
            "unit": "ns/op\t    2161 B/op\t      24 allocs/op",
            "extra": "39 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory/check_hit - ns/op",
            "value": 8838293,
            "unit": "ns/op",
            "extra": "39 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory/check_hit - B/op",
            "value": 2161,
            "unit": "B/op",
            "extra": "39 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory/check_hit - allocs/op",
            "value": 24,
            "unit": "allocs/op",
            "extra": "39 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory/check_miss",
            "value": 9445754,
            "unit": "ns/op\t    2945 B/op\t      20 allocs/op",
            "extra": "37 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory/check_miss - ns/op",
            "value": 9445754,
            "unit": "ns/op",
            "extra": "37 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory/check_miss - B/op",
            "value": 2945,
            "unit": "B/op",
            "extra": "37 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory/check_miss - allocs/op",
            "value": 20,
            "unit": "allocs/op",
            "extra": "37 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory/bulk_100",
            "value": 36574967,
            "unit": "ns/op\t  335814 B/op\t    1521 allocs/op",
            "extra": "9 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory/bulk_100 - ns/op",
            "value": 36574967,
            "unit": "ns/op",
            "extra": "9 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory/bulk_100 - B/op",
            "value": 335814,
            "unit": "B/op",
            "extra": "9 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory/bulk_100 - allocs/op",
            "value": 1521,
            "unit": "allocs/op",
            "extra": "9 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory/subjects_one",
            "value": 9555824,
            "unit": "ns/op\t    5059 B/op\t      32 allocs/op",
            "extra": "37 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory/subjects_one - ns/op",
            "value": 9555824,
            "unit": "ns/op",
            "extra": "37 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory/subjects_one - B/op",
            "value": 5059,
            "unit": "B/op",
            "extra": "37 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory/subjects_one - allocs/op",
            "value": 32,
            "unit": "allocs/op",
            "extra": "37 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory/toggle_team_edge",
            "value": 115885704,
            "unit": "ns/op\t125885728 B/op\t    2066 allocs/op",
            "extra": "3 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory/toggle_team_edge - ns/op",
            "value": 115885704,
            "unit": "ns/op",
            "extra": "3 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory/toggle_team_edge - B/op",
            "value": 125885728,
            "unit": "B/op",
            "extra": "3 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory/toggle_team_edge - allocs/op",
            "value": 2066,
            "unit": "allocs/op",
            "extra": "3 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory+index/lookup",
            "value": 1504452001,
            "unit": "ns/op\t1150805120 B/op\t11000990 allocs/op",
            "extra": "1 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory+index/lookup - ns/op",
            "value": 1504452001,
            "unit": "ns/op",
            "extra": "1 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory+index/lookup - B/op",
            "value": 1150805120,
            "unit": "B/op",
            "extra": "1 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory+index/lookup - allocs/op",
            "value": 11000990,
            "unit": "allocs/op",
            "extra": "1 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory+index/check_hit",
            "value": 1809,
            "unit": "ns/op\t    1017 B/op\t      11 allocs/op",
            "extra": "193106 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory+index/check_hit - ns/op",
            "value": 1809,
            "unit": "ns/op",
            "extra": "193106 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory+index/check_hit - B/op",
            "value": 1017,
            "unit": "B/op",
            "extra": "193106 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory+index/check_hit - allocs/op",
            "value": 11,
            "unit": "allocs/op",
            "extra": "193106 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory+index/check_miss",
            "value": 1557,
            "unit": "ns/op\t     921 B/op\t      10 allocs/op",
            "extra": "211014 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory+index/check_miss - ns/op",
            "value": 1557,
            "unit": "ns/op",
            "extra": "211014 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory+index/check_miss - B/op",
            "value": 921,
            "unit": "B/op",
            "extra": "211014 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory+index/check_miss - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "211014 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory+index/bulk_100",
            "value": 4153185,
            "unit": "ns/op\t 4258927 B/op\t     465 allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory+index/bulk_100 - ns/op",
            "value": 4153185,
            "unit": "ns/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory+index/bulk_100 - B/op",
            "value": 4258927,
            "unit": "B/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory+index/bulk_100 - allocs/op",
            "value": 465,
            "unit": "allocs/op",
            "extra": "100 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory+index/subjects_one",
            "value": 2200,
            "unit": "ns/op\t    1704 B/op\t      18 allocs/op",
            "extra": "199759 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory+index/subjects_one - ns/op",
            "value": 2200,
            "unit": "ns/op",
            "extra": "199759 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory+index/subjects_one - B/op",
            "value": 1704,
            "unit": "B/op",
            "extra": "199759 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory+index/subjects_one - allocs/op",
            "value": 18,
            "unit": "allocs/op",
            "extra": "199759 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory+index/toggle_team_edge",
            "value": 154292916,
            "unit": "ns/op\t125891700 B/op\t    2066 allocs/op",
            "extra": "2 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory+index/toggle_team_edge - ns/op",
            "value": 154292916,
            "unit": "ns/op",
            "extra": "2 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory+index/toggle_team_edge - B/op",
            "value": 125891700,
            "unit": "B/op",
            "extra": "2 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=memory+index/toggle_team_edge - allocs/op",
            "value": 2066,
            "unit": "allocs/op",
            "extra": "2 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres/lookup",
            "value": 69270550,
            "unit": "ns/op\t31765577 B/op\t  319411 allocs/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres/lookup - ns/op",
            "value": 69270550,
            "unit": "ns/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres/lookup - B/op",
            "value": 31765577,
            "unit": "B/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres/lookup - allocs/op",
            "value": 319411,
            "unit": "allocs/op",
            "extra": "5 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres/check_hit",
            "value": 482818,
            "unit": "ns/op\t    5667 B/op\t      99 allocs/op",
            "extra": "788 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres/check_hit - ns/op",
            "value": 482818,
            "unit": "ns/op",
            "extra": "788 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres/check_hit - B/op",
            "value": 5667,
            "unit": "B/op",
            "extra": "788 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres/check_hit - allocs/op",
            "value": 99,
            "unit": "allocs/op",
            "extra": "788 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres/check_miss",
            "value": 512352,
            "unit": "ns/op\t    4939 B/op\t      81 allocs/op",
            "extra": "790 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres/check_miss - ns/op",
            "value": 512352,
            "unit": "ns/op",
            "extra": "790 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres/check_miss - B/op",
            "value": 4939,
            "unit": "B/op",
            "extra": "790 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres/check_miss - allocs/op",
            "value": 81,
            "unit": "allocs/op",
            "extra": "790 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres/bulk_100",
            "value": 1796187,
            "unit": "ns/op\t  403433 B/op\t    3803 allocs/op",
            "extra": "189 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres/bulk_100 - ns/op",
            "value": 1796187,
            "unit": "ns/op",
            "extra": "189 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres/bulk_100 - B/op",
            "value": 403433,
            "unit": "B/op",
            "extra": "189 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres/bulk_100 - allocs/op",
            "value": 3803,
            "unit": "allocs/op",
            "extra": "189 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres/subjects_one",
            "value": 384539,
            "unit": "ns/op\t    6092 B/op\t      93 allocs/op",
            "extra": "908 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres/subjects_one - ns/op",
            "value": 384539,
            "unit": "ns/op",
            "extra": "908 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres/subjects_one - B/op",
            "value": 6092,
            "unit": "B/op",
            "extra": "908 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres/subjects_one - allocs/op",
            "value": 93,
            "unit": "allocs/op",
            "extra": "908 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres/toggle_team_edge",
            "value": 14017031,
            "unit": "ns/op\t   14477 B/op\t     148 allocs/op",
            "extra": "54 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres/toggle_team_edge - ns/op",
            "value": 14017031,
            "unit": "ns/op",
            "extra": "54 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres/toggle_team_edge - B/op",
            "value": 14477,
            "unit": "B/op",
            "extra": "54 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres/toggle_team_edge - allocs/op",
            "value": 148,
            "unit": "allocs/op",
            "extra": "54 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+closure/lookup",
            "value": 16671614,
            "unit": "ns/op\t 2984720 B/op\t   30110 allocs/op",
            "extra": "18 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+closure/lookup - ns/op",
            "value": 16671614,
            "unit": "ns/op",
            "extra": "18 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+closure/lookup - B/op",
            "value": 2984720,
            "unit": "B/op",
            "extra": "18 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+closure/lookup - allocs/op",
            "value": 30110,
            "unit": "allocs/op",
            "extra": "18 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+closure/check_hit",
            "value": 604418,
            "unit": "ns/op\t    5854 B/op\t      97 allocs/op",
            "extra": "525 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+closure/check_hit - ns/op",
            "value": 604418,
            "unit": "ns/op",
            "extra": "525 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+closure/check_hit - B/op",
            "value": 5854,
            "unit": "B/op",
            "extra": "525 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+closure/check_hit - allocs/op",
            "value": 97,
            "unit": "allocs/op",
            "extra": "525 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+closure/check_miss",
            "value": 945444,
            "unit": "ns/op\t    9781 B/op\t     162 allocs/op",
            "extra": "404 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+closure/check_miss - ns/op",
            "value": 945444,
            "unit": "ns/op",
            "extra": "404 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+closure/check_miss - B/op",
            "value": 9781,
            "unit": "B/op",
            "extra": "404 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+closure/check_miss - allocs/op",
            "value": 162,
            "unit": "allocs/op",
            "extra": "404 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+closure/bulk_100",
            "value": 3960381,
            "unit": "ns/op\t  169505 B/op\t    1629 allocs/op",
            "extra": "91 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+closure/bulk_100 - ns/op",
            "value": 3960381,
            "unit": "ns/op",
            "extra": "91 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+closure/bulk_100 - B/op",
            "value": 169505,
            "unit": "B/op",
            "extra": "91 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+closure/bulk_100 - allocs/op",
            "value": 1629,
            "unit": "allocs/op",
            "extra": "91 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+closure/subjects_one",
            "value": 983096,
            "unit": "ns/op\t    9514 B/op\t     158 allocs/op",
            "extra": "343 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+closure/subjects_one - ns/op",
            "value": 983096,
            "unit": "ns/op",
            "extra": "343 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+closure/subjects_one - B/op",
            "value": 9514,
            "unit": "B/op",
            "extra": "343 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+closure/subjects_one - allocs/op",
            "value": 158,
            "unit": "allocs/op",
            "extra": "343 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+closure/toggle_team_edge",
            "value": 83417011,
            "unit": "ns/op\t   54822 B/op\t     276 allocs/op",
            "extra": "4 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+closure/toggle_team_edge - ns/op",
            "value": 83417011,
            "unit": "ns/op",
            "extra": "4 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+closure/toggle_team_edge - B/op",
            "value": 54822,
            "unit": "B/op",
            "extra": "4 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+closure/toggle_team_edge - allocs/op",
            "value": 276,
            "unit": "allocs/op",
            "extra": "4 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+sets/lookup",
            "value": 16902618,
            "unit": "ns/op\t 2109770 B/op\t   29994 allocs/op",
            "extra": "19 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+sets/lookup - ns/op",
            "value": 16902618,
            "unit": "ns/op",
            "extra": "19 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+sets/lookup - B/op",
            "value": 2109770,
            "unit": "B/op",
            "extra": "19 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+sets/lookup - allocs/op",
            "value": 29994,
            "unit": "allocs/op",
            "extra": "19 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+sets/check_hit",
            "value": 827620,
            "unit": "ns/op\t    5853 B/op\t      77 allocs/op",
            "extra": "412 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+sets/check_hit - ns/op",
            "value": 827620,
            "unit": "ns/op",
            "extra": "412 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+sets/check_hit - B/op",
            "value": 5853,
            "unit": "B/op",
            "extra": "412 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+sets/check_hit - allocs/op",
            "value": 77,
            "unit": "allocs/op",
            "extra": "412 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+sets/check_miss",
            "value": 853206,
            "unit": "ns/op\t    5948 B/op\t      77 allocs/op",
            "extra": "459 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+sets/check_miss - ns/op",
            "value": 853206,
            "unit": "ns/op",
            "extra": "459 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+sets/check_miss - B/op",
            "value": 5948,
            "unit": "B/op",
            "extra": "459 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+sets/check_miss - allocs/op",
            "value": 77,
            "unit": "allocs/op",
            "extra": "459 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+sets/bulk_100",
            "value": 8563954,
            "unit": "ns/op\t   68677 B/op\t     900 allocs/op",
            "extra": "39 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+sets/bulk_100 - ns/op",
            "value": 8563954,
            "unit": "ns/op",
            "extra": "39 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+sets/bulk_100 - B/op",
            "value": 68677,
            "unit": "B/op",
            "extra": "39 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+sets/bulk_100 - allocs/op",
            "value": 900,
            "unit": "allocs/op",
            "extra": "39 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+sets/subjects_one",
            "value": 625650,
            "unit": "ns/op\t    3823 B/op\t      82 allocs/op",
            "extra": "573 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+sets/subjects_one - ns/op",
            "value": 625650,
            "unit": "ns/op",
            "extra": "573 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+sets/subjects_one - B/op",
            "value": 3823,
            "unit": "B/op",
            "extra": "573 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+sets/subjects_one - allocs/op",
            "value": 82,
            "unit": "allocs/op",
            "extra": "573 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+sets/toggle_team_edge",
            "value": 110330771,
            "unit": "ns/op\t  160861 B/op\t     461 allocs/op",
            "extra": "3 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+sets/toggle_team_edge - ns/op",
            "value": 110330771,
            "unit": "ns/op",
            "extra": "3 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+sets/toggle_team_edge - B/op",
            "value": 160861,
            "unit": "B/op",
            "extra": "3 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=postgres+sets/toggle_team_edge - allocs/op",
            "value": 461,
            "unit": "allocs/op",
            "extra": "3 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-memdb/lookup",
            "value": 50216439,
            "unit": "ns/op\t 9757050 B/op\t  101719 allocs/op",
            "extra": "6 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-memdb/lookup - ns/op",
            "value": 50216439,
            "unit": "ns/op",
            "extra": "6 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-memdb/lookup - B/op",
            "value": 9757050,
            "unit": "B/op",
            "extra": "6 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-memdb/lookup - allocs/op",
            "value": 101719,
            "unit": "allocs/op",
            "extra": "6 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-memdb/check_hit",
            "value": 327020,
            "unit": "ns/op\t    7427 B/op\t     108 allocs/op",
            "extra": "1080 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-memdb/check_hit - ns/op",
            "value": 327020,
            "unit": "ns/op",
            "extra": "1080 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-memdb/check_hit - B/op",
            "value": 7427,
            "unit": "B/op",
            "extra": "1080 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-memdb/check_hit - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "1080 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-memdb/check_miss",
            "value": 357843,
            "unit": "ns/op\t    7370 B/op\t     108 allocs/op",
            "extra": "993 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-memdb/check_miss - ns/op",
            "value": 357843,
            "unit": "ns/op",
            "extra": "993 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-memdb/check_miss - B/op",
            "value": 7370,
            "unit": "B/op",
            "extra": "993 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-memdb/check_miss - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "993 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-memdb/bulk_100",
            "value": 346538232,
            "unit": "ns/op\t  123448 B/op\t    1733 allocs/op",
            "extra": "1 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-memdb/bulk_100 - ns/op",
            "value": 346538232,
            "unit": "ns/op",
            "extra": "1 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-memdb/bulk_100 - B/op",
            "value": 123448,
            "unit": "B/op",
            "extra": "1 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-memdb/bulk_100 - allocs/op",
            "value": 1733,
            "unit": "allocs/op",
            "extra": "1 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-memdb/subjects_one",
            "value": 351326,
            "unit": "ns/op\t    8959 B/op\t     138 allocs/op",
            "extra": "1021 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-memdb/subjects_one - ns/op",
            "value": 351326,
            "unit": "ns/op",
            "extra": "1021 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-memdb/subjects_one - B/op",
            "value": 8959,
            "unit": "B/op",
            "extra": "1021 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-memdb/subjects_one - allocs/op",
            "value": 138,
            "unit": "allocs/op",
            "extra": "1021 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-memdb/toggle_team_edge",
            "value": 784144,
            "unit": "ns/op\t   15198 B/op\t     225 allocs/op",
            "extra": "454 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-memdb/toggle_team_edge - ns/op",
            "value": 784144,
            "unit": "ns/op",
            "extra": "454 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-memdb/toggle_team_edge - B/op",
            "value": 15198,
            "unit": "B/op",
            "extra": "454 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-memdb/toggle_team_edge - allocs/op",
            "value": 225,
            "unit": "allocs/op",
            "extra": "454 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-postgres/lookup",
            "value": 51513535,
            "unit": "ns/op\t 9031068 B/op\t  101789 allocs/op",
            "extra": "7 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-postgres/lookup - ns/op",
            "value": 51513535,
            "unit": "ns/op",
            "extra": "7 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-postgres/lookup - B/op",
            "value": 9031068,
            "unit": "B/op",
            "extra": "7 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-postgres/lookup - allocs/op",
            "value": 101789,
            "unit": "allocs/op",
            "extra": "7 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-postgres/check_hit",
            "value": 584012,
            "unit": "ns/op\t    7407 B/op\t     108 allocs/op",
            "extra": "595 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-postgres/check_hit - ns/op",
            "value": 584012,
            "unit": "ns/op",
            "extra": "595 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-postgres/check_hit - B/op",
            "value": 7407,
            "unit": "B/op",
            "extra": "595 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-postgres/check_hit - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "595 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-postgres/check_miss",
            "value": 596317,
            "unit": "ns/op\t    7350 B/op\t     108 allocs/op",
            "extra": "608 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-postgres/check_miss - ns/op",
            "value": 596317,
            "unit": "ns/op",
            "extra": "608 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-postgres/check_miss - B/op",
            "value": 7350,
            "unit": "B/op",
            "extra": "608 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-postgres/check_miss - allocs/op",
            "value": 108,
            "unit": "allocs/op",
            "extra": "608 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-postgres/bulk_100",
            "value": 1395645,
            "unit": "ns/op\t   99332 B/op\t    1711 allocs/op",
            "extra": "261 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-postgres/bulk_100 - ns/op",
            "value": 1395645,
            "unit": "ns/op",
            "extra": "261 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-postgres/bulk_100 - B/op",
            "value": 99332,
            "unit": "B/op",
            "extra": "261 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-postgres/bulk_100 - allocs/op",
            "value": 1711,
            "unit": "allocs/op",
            "extra": "261 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-postgres/subjects_one",
            "value": 602228,
            "unit": "ns/op\t    8893 B/op\t     138 allocs/op",
            "extra": "570 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-postgres/subjects_one - ns/op",
            "value": 602228,
            "unit": "ns/op",
            "extra": "570 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-postgres/subjects_one - B/op",
            "value": 8893,
            "unit": "B/op",
            "extra": "570 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-postgres/subjects_one - allocs/op",
            "value": 138,
            "unit": "allocs/op",
            "extra": "570 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-postgres/toggle_team_edge",
            "value": 26722801,
            "unit": "ns/op\t   16998 B/op\t     226 allocs/op",
            "extra": "20 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-postgres/toggle_team_edge - ns/op",
            "value": 26722801,
            "unit": "ns/op",
            "extra": "20 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-postgres/toggle_team_edge - B/op",
            "value": 16998,
            "unit": "B/op",
            "extra": "20 times\n4 procs"
          },
          {
            "name": "BenchmarkScenarios/scale/resources=100000/density=10/path=team/kind=spicedb-postgres/toggle_team_edge - allocs/op",
            "value": 226,
            "unit": "allocs/op",
            "extra": "20 times\n4 procs"
          }
        ]
      }
    ]
  }
}