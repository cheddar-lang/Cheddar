#include "binding.h"

namespace cheddar {
namespace binding {
    ExecutionContext::ExecutionContext(const std::string& code, const ExecutionContext::Context& context): code(code), context(context) {
    }
}
}
