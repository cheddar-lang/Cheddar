#include <primesieve.hpp>
#include <v8.h>
#include <nan.h>

#include <vector>

NAN_METHOD(primes_below_n) {
    if (info.Length() != 1 || !info[0]->IsNumber()) {
        Nan::ThrowTypeError("Expected one argument of type Number");
        return;
    }

    double n = info[0]->NumberValue();
    v8::Local<v8::Array> primes = Nan::New<v8::Array>();

    primesieve::iterator it;
    uint64_t lastPrime = it.next_prime();
    int index = 0;

    while (lastPrime < n) {
        primes->Set(index++, Nan::New<v8::Number>( lastPrime ));
        lastPrime = it.next_prime();
    }

    info.GetReturnValue().Set(primes);
}

NAN_METHOD(n_primes) {
    primesieve::iterator gen;
    uint64_t prime = gen.next_prime();
    info.GetReturnValue().Set(Nan::New<v8::Number>( prime ));
}

NAN_MODULE_INIT(initAll) {
    Nan::Set(target, Nan::New("primesUnder").ToLocalChecked(),
            Nan::GetFunction(Nan::New<v8::FunctionTemplate>( primes_below_n )).ToLocalChecked());
}

NODE_MODULE(binding, initAll)
