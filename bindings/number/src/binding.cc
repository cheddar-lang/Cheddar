#include <v8.h>
#include <nan.h>

#include <string>
#include "binding.h"

#include <iostream>
#include <limits>
#include <sstream>
#include <iomanip>
#include <cstdlib>
#include <cmath>

NAN_MODULE_INIT(NumberObject::Init) {
    v8::Local<v8::FunctionTemplate> tpl = Nan::New<v8::FunctionTemplate>(New);
    tpl->SetClassName(Nan::New("CheddarNumberBinding").ToLocalChecked());

    // This is really the binding scope, which then adds the class itself to it
    tpl->InstanceTemplate()->SetInternalFieldCount(1);
    
    Nan::SetPrototypeMethod(tpl, "toString", ToString);

    Nan::SetPrototypeMethod(tpl, "isInteger", IsInteger);
    Nan::SetPrototypeMethod(tpl, "accessAt", AccessAt);
    
    Nan::SetPrototypeMethod(tpl, "add", Add);
    Nan::SetPrototypeMethod(tpl, "minus", Minus);
    Nan::SetPrototypeMethod(tpl, "times", Times);
    Nan::SetPrototypeMethod(tpl, "divide", Divide);
    Nan::SetPrototypeMethod(tpl, "pow", Power);
    Nan::SetPrototypeMethod(tpl, "log", Log);
    Nan::SetPrototypeMethod(tpl, "logn", LogN);
    Nan::SetPrototypeMethod(tpl, "mod", Mod);
    Nan::SetPrototypeMethod(tpl, "sqrt", Sqrt);
    Nan::SetPrototypeMethod(tpl, "cbrt", Cbrt);
    Nan::SetPrototypeMethod(tpl, "root", Root);

    Nan::SetPrototypeMethod(tpl, "gt", Gt);
    Nan::SetPrototypeMethod(tpl, "gte", Gte);
    Nan::SetPrototypeMethod(tpl, "lt", Lt);
    Nan::SetPrototypeMethod(tpl, "lte", Lte);
    Nan::SetPrototypeMethod(tpl, "eq", Eq);
    Nan::SetPrototypeMethod(tpl, "neq", Neq);
    Nan::SetPrototypeMethod(tpl, "not", Not);

    Nan::SetPrototypeMethod(tpl, "round", Round);
    Nan::SetPrototypeMethod(tpl, "ceil", Ceil);
    Nan::SetPrototypeMethod(tpl, "floor", Floor);
    Nan::SetPrototypeMethod(tpl, "sign", Sign);
    Nan::SetPrototypeMethod(tpl, "abs", Abs);

    Nan::SetPrototypeMethod(tpl, "tan", Tan);
    Nan::SetPrototypeMethod(tpl, "cos", Cos);
    Nan::SetPrototypeMethod(tpl, "sin", Sin);
    Nan::SetPrototypeMethod(tpl, "atan", Atan);
    Nan::SetPrototypeMethod(tpl, "acos", Acos);
    Nan::SetPrototypeMethod(tpl, "asin", Asin);

    Nan::SetPrototypeMethod(tpl, "bAND", BinaryAnd);
    Nan::SetPrototypeMethod(tpl, "bNOT", BinaryNot);
    Nan::SetPrototypeMethod(tpl, "bOR", BinaryOr);
    Nan::SetPrototypeMethod(tpl, "bXOR", BinaryXor);
    Nan::SetPrototypeMethod(tpl, "bLEFT", BinaryLeft);
    Nan::SetPrototypeMethod(tpl, "bRIGHT", BinaryRight);
    
    constructor().Reset(Nan::GetFunction(tpl).ToLocalChecked());
    Nan::Set(target, Nan::New("CheddarNumberBinding").ToLocalChecked(),
        Nan::GetFunction(tpl).ToLocalChecked());
}

NAN_METHOD(NumberObject::IsInteger) {
    SELF_BOILERPLATE
    info.GetReturnValue().Set( Nan::New( self->value == trunc(self->value) ) );
}

NAN_METHOD(NumberObject::AccessAt) {
    SELF_BOILERPLATE
    if (self->value < 0) {
        v8::Local<v8::Object> array = info[0]->ToObject();
        info.GetReturnValue().Set( array->Get( (uint32_t) ( array->Get(Nan::New<v8::String>("length").ToLocalChecked())->Uint32Value() + self->value) ));
    } else {
        info.GetReturnValue().Set( info[0]->ToObject()->Get( (uint32_t) self->value ));
    }
}

/**
 * Returns a string representation of the value
 *  - n, int 1-16, radix
 */
NAN_METHOD(NumberObject::ToString) {
    NumberObject *num = UNWRAP(info.Holder());
    std::ostringstream out;
    out << std::setprecision(std::numeric_limits<num_t>::digits10 + 1) << num->value;
    info.GetReturnValue().Set( Nan::New( out.str() ).ToLocalChecked() );
}

/**
 * Creates a fresh Number object from an existing number object
 * For other uses use, NumberObject::fromValue
 */
NAN_METHOD(NumberObject::New) {
    if (info.IsConstructCall()) {
        NumberObject* self;
        
        if (info.Length() == 0) {
            self = new NumberObject( 0 );
        } else if (info[0]->IsNumber() || info[0]->IsString()) {
            self = new NumberObject(info[0]->NumberValue());
        } else {
            // Unwrap existing internal number object
            NumberObject* old = Nan::ObjectWrap::Unwrap<NumberObject>(
                info[0]->ToObject()
            );
    
            // Create reference and leave v8 to GC it when applicable
            self = new NumberObject( old->value );
        }
        
        // Okay, put our object in the this
        self->Wrap(info.This());
        
        // Now we can just return it
        info.GetReturnValue().Set(info.This());
    } else {
        Nan::ThrowTypeError("YOU CAN'T DO THAT DUMMY (You've goat to call this as constructor).");
    }
}


NODE_MODULE(binding, NumberObject::Init)
