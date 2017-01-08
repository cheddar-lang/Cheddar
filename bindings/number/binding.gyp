{
    "targets": [
        {
            "target_name": "number",
            "sources": [
                "src/binding.cc",
                "src/ops.cc"
            ],
            "include_dirs" : [ "<!(node -e \"require('nan')\")" ]
        }
    ]
}
