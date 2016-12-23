{
    "targets": [
        {
            "target_name": "prime_binding",
            "type": "<(library)",
            "sources": [
                "primesieve/include",
                "primesieve/src/primesieve/EratBig.cpp",
                "primesieve/src/primesieve/ParallelPrimeSieve.cpp",
                "primesieve/src/primesieve/PrimeGenerator.cpp",
                "primesieve/src/primesieve/iterator.cpp",
                "primesieve/src/primesieve/primesieve-api.cpp",
                "primesieve/src/primesieve/EratMedium.cpp",
                "primesieve/src/primesieve/PreSieve.cpp",
                "primesieve/src/primesieve/PrimeSieve-nthPrime.cpp",
                "primesieve/src/primesieve/SieveOfEratosthenes.cpp",
                "primesieve/src/primesieve/popcount.cpp",
                "primesieve/src/primesieve/primesieve_iterator.cpp",
                "primesieve/src/primesieve/EratSmall.cpp",
                "primesieve/src/primesieve/PrimeFinder.cpp",
                "primesieve/src/primesieve/PrimeSieve.cpp",
                "primesieve/src/primesieve/WheelFactorization.cpp",
                "primesieve/src/primesieve/primesieve-api-c.cpp",
                "primesieve/src/primesieve/primesieve_test.cpp"
            ],
            "include_dirs": [
                "primesieve/include"
            ],
            "direct_dependent_settings": {
                "include_dirs": [
                    "primesieve/include"
                ],
                "libraries": [ "-Wl,-rpath,<!(pwd)/build/Release/" ],
                'cflags!': [ '-fno-exceptions' ],
                'cflags_cc!': [ '-fno-exceptions' ],
                'conditions': [
                    ['OS=="mac"', {
                        'xcode_settings': {
                            'GCC_ENABLE_CPP_EXCEPTIONS': 'YES'
                        }
                    }]
                ]
            },
            'cflags!': [ '-fno-exceptions' ],
            'cflags_cc!': [ '-fno-exceptions' ],
            'conditions': [
                ['OS=="mac"', {
                    'xcode_settings': {
                        'GCC_ENABLE_CPP_EXCEPTIONS': 'YES'
                    }
                }]
            ]
        },
        {
            "target_name": "primes",
            "dependencies": [ "prime_binding" ],
            "sources": [
                "src/binding.cc"
            ],
            "include_dirs" : [ "<!(node -e \"require('nan')\")" ]
        }
    ]
}
