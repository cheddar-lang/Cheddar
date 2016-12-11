#ifndef BINDING_H
#define BINDING_H

#include <string.h>
#include <v8.h>
#include <node.h> 
#include <nan.h>

namespace cheddar {
namespace binding {
    class ExecutionContext {
        private:
        v8::Object parser;
        v8::Object vm;

        public:
        ExecutionContext(std::string code, ExecutionContext::Context);

        std::string& code;
        ExecutionContext::Context& context;

        static class Context {
            void print(std::string);
            void hook();
        }
    }
}
}

#endif
