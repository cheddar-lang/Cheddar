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
    if (info.Length() != 1 || !info[0]->IsNumber()) {
        Nan::ThrowTypeError("Expected one argument of type Number");
        return;
    }

    double n = info[0]->NumberValue();
    v8::Local<v8::Array> primes = Nan::New<v8::Array>();

    primesieve::iterator gen;
    int index = 0;

    while ( index < n ) {
        primes->Set(
            index++,
            Nan::New<v8::Number>( gen.next_prime() )
        );
    }

    info.GetReturnValue().Set( primes );
}

NAN_MODULE_INIT(initAll) {
    Nan::Set(target, Nan::New("primesUnder").ToLocalChecked(),
            Nan::GetFunction(Nan::New<v8::FunctionTemplate>( primes_below_n )).ToLocalChecked());

    Nan::Set(target, Nan::New("generatePrimes").ToLocalChecked(),
            Nan::GetFunction(Nan::New<v8::FunctionTemplate>( n_primes )).ToLocalChecked());
}

NODE_MODULE(binding, initAll)
