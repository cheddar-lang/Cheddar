import StatementExpression from './core/eval/eval';
import StatementAssign     from './states/assign';
import StatementFor        from './states/for';
import StatementIf         from './states/if';

export default {
    StatementAssign,
    StatementIf,
    StatementFor,
    StatementExpression
}