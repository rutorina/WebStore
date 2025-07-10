const fs = require('fs');

// PROFESSIONAL BPMN 2.0 Generator - PROPER HORIZONTAL SWIMLANES
// True left-to-right flow with standard BPMN 2.0 pool/lane structure

class BPMNIdGenerator {
    constructor() {
        this.counter = 1;
        this.usedIds = new Set();
    }
    
    getId() {
        let id;
        do {
            id = `bpmn_${this.counter++}`;
        } while (this.usedIds.has(id));
        
        this.usedIds.add(id);
        return id;
    }
    
    reset() {
        this.counter = 1;
        this.usedIds.clear();
    }
}

const bpmnId = new BPMNIdGenerator();

// BPMN 2.0 ELEMENTS WITH PROPER STYLING
const BPMN_ELEMENTS = {
    // EVENTS
    START_EVENT: {
        style: 'ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#D5E8D4;strokeColor=#82B366;strokeWidth=3;fontSize=10;fontColor=#000000;',
        width: 50, height: 50
    },
    END_EVENT: {
        style: 'ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#F8CECC;strokeColor=#B85450;strokeWidth=6;fontSize=10;fontColor=#000000;',
        width: 50, height: 50
    },
    MESSAGE_START: {
        style: 'ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#D5E8D4;strokeColor=#82B366;strokeWidth=3;fontSize=10;fontColor=#000000;',
        width: 50, height: 50, symbol: '✉'
    },
    MESSAGE_END: {
        style: 'ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#F8CECC;strokeColor=#B85450;strokeWidth=6;fontSize=10;fontColor=#000000;',
        width: 50, height: 50, symbol: '✉'
    },
    ERROR_EVENT: {
        style: 'ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#F8CECC;strokeColor=#B85450;strokeWidth=6;fontSize=10;fontColor=#000000;',
        width: 50, height: 50, symbol: '⚠'
    },
    
    // ACTIVITIES
    USER_TASK: {
        style: 'rounded=1;whiteSpace=wrap;html=1;fillColor=#DAE8FC;strokeColor=#6C8EBF;strokeWidth=2;fontSize=11;fontColor=#000000;',
        width: 120, height: 60, symbol: '👤'
    },
    SERVICE_TASK: {
        style: 'rounded=1;whiteSpace=wrap;html=1;fillColor=#E1D5E7;strokeColor=#9673A6;strokeWidth=2;fontSize=11;fontColor=#000000;',
        width: 120, height: 60, symbol: '⚙'
    },
    SCRIPT_TASK: {
        style: 'rounded=1;whiteSpace=wrap;html=1;fillColor=#FFF2CC;strokeColor=#D6B656;strokeWidth=2;fontSize=11;fontColor=#000000;',
        width: 120, height: 60, symbol: '💻'
    },
    SEND_TASK: {
        style: 'rounded=1;whiteSpace=wrap;html=1;fillColor=#F8CECC;strokeColor=#B85450;strokeWidth=2;fontSize=11;fontColor=#000000;',
        width: 120, height: 60, symbol: '📤'
    },
    RECEIVE_TASK: {
        style: 'rounded=1;whiteSpace=wrap;html=1;fillColor=#D5E8D4;strokeColor=#82B366;strokeWidth=2;fontSize=11;fontColor=#000000;',
        width: 120, height: 60, symbol: '📥'
    },
    
    // GATEWAYS
    EXCLUSIVE_GATEWAY: {
        style: 'rhombus;whiteSpace=wrap;html=1;fillColor=#FFF2CC;strokeColor=#D6B656;strokeWidth=3;fontSize=10;fontColor=#000000;',
        width: 50, height: 50, symbol: '✕'
    },
    
    // DATA STORES
    DATA_STORE: {
        style: 'shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=15;fillColor=#F5F5F5;strokeColor=#666666;fontSize=10;fontColor=#000000;',
        width: 80, height: 60
    }
};

// FLOW TYPES
const FLOWS = {
    SEQUENCE: {
        style: 'edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#000000;endArrow=classic;endSize=8;'
    },
    MESSAGE: {
        style: 'edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#0066CC;dashed=1;dashPattern=8 8;startArrow=none;endArrow=classic;endSize=8;'
    },
    ASSOCIATION: {
        style: 'edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=1;strokeColor=#666666;dashed=1;dashPattern=3 3;startArrow=none;endArrow=none;'
    }
};

function createBPMNCell(id, value, style, geometry, parent = '1') {
    const vertex = style.includes('edgeStyle') ? '' : ' vertex="1"';
    const edge = style.includes('edgeStyle') ? ' edge="1"' : '';
    
    let geometryXML;
    if (style.includes('edgeStyle')) {
        geometryXML = `<mxGeometry relative="1" as="geometry"/>`;
    } else {
        geometryXML = `<mxGeometry x="${geometry.x}" y="${geometry.y}" width="${geometry.width}" height="${geometry.height}" as="geometry"/>`;
    }
    
    return `    <mxCell id="${id}" value="${value}" style="${style}"${vertex}${edge} parent="${parent}">
      ${geometryXML}
    </mxCell>`;
}

function createBPMNElement(type, label, x, y, parent = '1') {
    const element = BPMN_ELEMENTS[type];
    const id = bpmnId.getId();
    const displayLabel = element.symbol ? `${element.symbol} ${label}` : label;
    
    return {
        id: id,
        xml: createBPMNCell(id, displayLabel, element.style, {
            x: x, y: y, width: element.width, height: element.height
        }, parent)
    };
}

function createBPMNFlow(sourceId, targetId, label = '', flowType = 'SEQUENCE') {
    const flow = FLOWS[flowType];
    const id = bpmnId.getId();
    
    return `    <mxCell id="${id}" value="${label}" style="${flow.style}" edge="1" parent="1" source="${sourceId}" target="${targetId}">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>`;
}

function generateProfessionalBPMN() {
    bpmnId.reset();
    
    const elements = [];
    const flows = [];
    
    // ROOT
    elements.push(`    <mxCell id="0"/>`);
    elements.push(`    <mxCell id="1" parent="0"/>`);
    
    // MAIN POOL - PROPER BPMN 2.0 HORIZONTAL STRUCTURE
    const poolId = bpmnId.getId();
    const mainPool = createBPMNCell(poolId, 'TechnoSvit Web Store - Item Purchase Process', 
        'swimlane;html=1;childLayout=stackLayout;resizeParent=1;resizeParentMax=0;horizontal=1;startSize=40;horizontalStack=0;collapsible=0;swimlaneLine=1;fillColor=#ffffff;strokeColor=#000000;fontStyle=1;fontSize=16;fontColor=#000000;',
        { x: 30, y: 30, width: 1800, height: 600 });
    elements.push(mainPool);
    
    // HORIZONTAL LANES - PROFESSIONAL BPMN 2.0 SWIMLANES
    const customerLaneId = bpmnId.getId();
    const customerLane = createBPMNCell(customerLaneId, 'Customer', 
        'swimlane;html=1;startSize=40;horizontal=1;swimlaneLine=1;fillColor=#e1f5fe;strokeColor=#01579b;fontSize=14;fontColor=#000000;resizeParent=1;resizeParentMax=0;',
        { x: 30, y: 70, width: 1770, height: 120 }, poolId);
    elements.push(customerLane);
    
    const webAppLaneId = bpmnId.getId();
    const webAppLane = createBPMNCell(webAppLaneId, 'Web Application', 
        'swimlane;html=1;startSize=40;horizontal=1;swimlaneLine=1;fillColor=#f3e5f5;strokeColor=#4a148c;fontSize=14;fontColor=#000000;resizeParent=1;resizeParentMax=0;',
        { x: 30, y: 190, width: 1770, height: 120 }, poolId);
    elements.push(webAppLane);
    
    const businessLaneId = bpmnId.getId();
    const businessLane = createBPMNCell(businessLaneId, 'Business Logic', 
        'swimlane;html=1;startSize=40;horizontal=1;swimlaneLine=1;fillColor=#e8f5e8;strokeColor=#2e7d32;fontSize=14;fontColor=#000000;resizeParent=1;resizeParentMax=0;',
        { x: 30, y: 310, width: 1770, height: 120 }, poolId);
    elements.push(businessLane);
    
    const dataLaneId = bpmnId.getId();
    const dataLane = createBPMNCell(dataLaneId, 'Data Layer', 
        'swimlane;html=1;startSize=40;horizontal=1;swimlaneLine=1;fillColor=#fff3e0;strokeColor=#e65100;fontSize=14;fontColor=#000000;resizeParent=1;resizeParentMax=0;',
        { x: 30, y: 430, width: 1770, height: 120 }, poolId);
    elements.push(dataLane);
    
    // EXTERNAL PAYMENT POOL
    const paymentPoolId = bpmnId.getId();
    const paymentPool = createBPMNCell(paymentPoolId, 'Payment Gateway', 
        'swimlane;html=1;childLayout=stackLayout;resizeParent=1;resizeParentMax=0;horizontal=1;startSize=40;horizontalStack=0;collapsible=0;swimlaneLine=1;fillColor=#ffebee;strokeColor=#c62828;fontStyle=1;fontSize=16;fontColor=#000000;',
        { x: 30, y: 680, width: 800, height: 100 });
    elements.push(paymentPool);
    
    // CUSTOMER LANE - TRUE LEFT-TO-RIGHT HORIZONTAL FLOW
    let x = 80, y = 125;
    const spacing = 160;
    
    // 1. Start Event
    const startEvent = createBPMNElement('MESSAGE_START', 'Visit\\nWebsite', x, y, customerLaneId);
    elements.push(startEvent.xml);
    
    // 2. Browse Products
    x += spacing;
    const browseProducts = createBPMNElement('USER_TASK', 'Browse\\nProducts', x, y, customerLaneId);
    elements.push(browseProducts.xml);
    flows.push(createBPMNFlow(startEvent.id, browseProducts.id));
    
    // 3. Select Product Gateway
    x += spacing;
    const selectGW = createBPMNElement('EXCLUSIVE_GATEWAY', 'Select?', x, y, customerLaneId);
    elements.push(selectGW.xml);
    flows.push(createBPMNFlow(browseProducts.id, selectGW.id));
    
    // 4. Add to Cart
    x += spacing;
    const addToCart = createBPMNElement('USER_TASK', 'Add to\\nCart', x, y, customerLaneId);
    elements.push(addToCart.xml);
    flows.push(createBPMNFlow(selectGW.id, addToCart.id, 'Yes'));
    
    // 5. Checkout Gateway
    x += spacing;
    const checkoutGW = createBPMNElement('EXCLUSIVE_GATEWAY', 'Checkout?', x, y, customerLaneId);
    elements.push(checkoutGW.xml);
    flows.push(createBPMNFlow(addToCart.id, checkoutGW.id));
    
    // 6. Checkout Process
    x += spacing;
    const checkout = createBPMNElement('USER_TASK', 'Checkout', x, y, customerLaneId);
    elements.push(checkout.xml);
    flows.push(createBPMNFlow(checkoutGW.id, checkout.id, 'Yes'));
    
    // 7. Fill Details
    x += spacing;
    const fillDetails = createBPMNElement('USER_TASK', 'Fill\\nDetails', x, y, customerLaneId);
    elements.push(fillDetails.xml);
    flows.push(createBPMNFlow(checkout.id, fillDetails.id));
    
    // 8. Make Payment
    x += spacing;
    const makePayment = createBPMNElement('USER_TASK', 'Make\\nPayment', x, y, customerLaneId);
    elements.push(makePayment.xml);
    flows.push(createBPMNFlow(fillDetails.id, makePayment.id));
    
    // 9. Order Complete
    x += spacing;
    const orderComplete = createBPMNElement('MESSAGE_END', 'Order\\nComplete', x, y, customerLaneId);
    elements.push(orderComplete.xml);
    flows.push(createBPMNFlow(makePayment.id, orderComplete.id));
    
    // Loop flows
    flows.push(createBPMNFlow(selectGW.id, browseProducts.id, 'No'));
    flows.push(createBPMNFlow(checkoutGW.id, browseProducts.id, 'Continue'));
    
    // WEB APPLICATION LANE - TRUE LEFT-TO-RIGHT HORIZONTAL FLOW
    x = 80, y = 245;
    
    // 1. Handle Request
    const handleReq = createBPMNElement('RECEIVE_TASK', 'Handle\\nRequest', x, y, webAppLaneId);
    elements.push(handleReq.xml);
    flows.push(createBPMNFlow(startEvent.id, handleReq.id, '', 'MESSAGE'));
    
    // 2. Load Catalog
    x += spacing;
    const loadCatalog = createBPMNElement('SERVICE_TASK', 'Load\\nCatalog', x, y, webAppLaneId);
    elements.push(loadCatalog.xml);
    flows.push(createBPMNFlow(handleReq.id, loadCatalog.id));
    
    // 3. Render Page
    x += spacing;
    const renderPage = createBPMNElement('SERVICE_TASK', 'Render\\nPage', x, y, webAppLaneId);
    elements.push(renderPage.xml);
    flows.push(createBPMNFlow(loadCatalog.id, renderPage.id));
    
    // 4. Manage Cart
    x += spacing;
    const manageCart = createBPMNElement('SERVICE_TASK', 'Manage\\nCart', x, y, webAppLaneId);
    elements.push(manageCart.xml);
    flows.push(createBPMNFlow(renderPage.id, manageCart.id));
    
    // 5. Process Checkout
    x += spacing;
    const processCheckout = createBPMNElement('SERVICE_TASK', 'Process\\nCheckout', x, y, webAppLaneId);
    elements.push(processCheckout.xml);
    flows.push(createBPMNFlow(manageCart.id, processCheckout.id));
    
    // 6. Process Order
    x += spacing;
    const processOrder = createBPMNElement('SERVICE_TASK', 'Process\\nOrder', x, y, webAppLaneId);
    elements.push(processOrder.xml);
    flows.push(createBPMNFlow(processCheckout.id, processOrder.id));
    
    // 7. Handle Payment
    x += spacing;
    const handlePayment = createBPMNElement('SERVICE_TASK', 'Handle\\nPayment', x, y, webAppLaneId);
    elements.push(handlePayment.xml);
    flows.push(createBPMNFlow(processOrder.id, handlePayment.id));
    
    // 8. Send Confirmation
    x += spacing;
    const sendConfirm = createBPMNElement('SEND_TASK', 'Send\\nConfirm', x, y, webAppLaneId);
    elements.push(sendConfirm.xml);
    flows.push(createBPMNFlow(handlePayment.id, sendConfirm.id));
    
    // 9. Complete
    x += spacing;
    const webComplete = createBPMNElement('END_EVENT', 'Web\\nComplete', x, y, webAppLaneId);
    elements.push(webComplete.xml);
    flows.push(createBPMNFlow(sendConfirm.id, webComplete.id));
    
    // BUSINESS LOGIC LANE - TRUE LEFT-TO-RIGHT HORIZONTAL FLOW
    x = 80, y = 365;
    
    // 1. Receive Order
    const receiveOrder = createBPMNElement('RECEIVE_TASK', 'Receive\\nOrder', x, y, businessLaneId);
    elements.push(receiveOrder.xml);
    flows.push(createBPMNFlow(processOrder.id, receiveOrder.id, '', 'MESSAGE'));
    
    // 2. Authenticate
    x += spacing;
    const authenticate = createBPMNElement('SERVICE_TASK', 'Authenticate', x, y, businessLaneId);
    elements.push(authenticate.xml);
    flows.push(createBPMNFlow(receiveOrder.id, authenticate.id));
    
    // 3. Validate Cart
    x += spacing;
    const validateCart = createBPMNElement('SERVICE_TASK', 'Validate\\nCart', x, y, businessLaneId);
    elements.push(validateCart.xml);
    flows.push(createBPMNFlow(authenticate.id, validateCart.id));
    
    // 4. Validation Gateway
    x += spacing;
    const validGW = createBPMNElement('EXCLUSIVE_GATEWAY', 'Valid?', x, y, businessLaneId);
    elements.push(validGW.xml);
    flows.push(createBPMNFlow(validateCart.id, validGW.id));
    
    // 5. Create Order
    x += spacing;
    const createOrder = createBPMNElement('SERVICE_TASK', 'Create\\nOrder', x, y, businessLaneId);
    elements.push(createOrder.xml);
    flows.push(createBPMNFlow(validGW.id, createOrder.id, 'Valid'));
    
    // 6. Update Inventory
    x += spacing;
    const updateInventory = createBPMNElement('SERVICE_TASK', 'Update\\nInventory', x, y, businessLaneId);
    elements.push(updateInventory.xml);
    flows.push(createBPMNFlow(createOrder.id, updateInventory.id));
    
    // 7. Generate Invoice
    x += spacing;
    const generateInvoice = createBPMNElement('SCRIPT_TASK', 'Generate\\nInvoice', x, y, businessLaneId);
    elements.push(generateInvoice.xml);
    flows.push(createBPMNFlow(updateInventory.id, generateInvoice.id));
    
    // 8. Business Complete
    x += spacing;
    const businessComplete = createBPMNElement('END_EVENT', 'Business\\nComplete', x, y, businessLaneId);
    elements.push(businessComplete.xml);
    flows.push(createBPMNFlow(generateInvoice.id, businessComplete.id));
    
    // Error handling
    const errorEvent = createBPMNElement('ERROR_EVENT', 'Error', x - 320, y + 40, businessLaneId);
    elements.push(errorEvent.xml);
    flows.push(createBPMNFlow(validGW.id, errorEvent.id, 'Invalid'));
    
    // DATA LAYER - HORIZONTAL DATABASE LAYOUT
    x = 200, y = 485;
    const dbSpacing = 150;
    
    const productsDB = createBPMNElement('DATA_STORE', 'Products\\nDB', x, y, dataLaneId);
    elements.push(productsDB.xml);
    
    x += dbSpacing;
    const ordersDB = createBPMNElement('DATA_STORE', 'Orders\\nDB', x, y, dataLaneId);
    elements.push(ordersDB.xml);
    
    x += dbSpacing;
    const usersDB = createBPMNElement('DATA_STORE', 'Users\\nDB', x, y, dataLaneId);
    elements.push(usersDB.xml);
    
    x += dbSpacing;
    const cartDB = createBPMNElement('DATA_STORE', 'Cart\\nDB', x, y, dataLaneId);
    elements.push(cartDB.xml);
    
    x += dbSpacing;
    const inventoryDB = createBPMNElement('DATA_STORE', 'Inventory\\nDB', x, y, dataLaneId);
    elements.push(inventoryDB.xml);
    
    // EXTERNAL PAYMENT GATEWAY - HORIZONTAL FLOW
    x = 200, y = 720;
    
    const paymentGW = createBPMNElement('SERVICE_TASK', 'Payment\\nGateway', x, y, paymentPoolId);
    elements.push(paymentGW.xml);
    flows.push(createBPMNFlow(makePayment.id, paymentGW.id, '', 'MESSAGE'));
    
    x += 160;
    const validatePayment = createBPMNElement('SERVICE_TASK', 'Validate\\nPayment', x, y, paymentPoolId);
    elements.push(validatePayment.xml);
    flows.push(createBPMNFlow(paymentGW.id, validatePayment.id));
    
    x += 160;
    const paymentResult = createBPMNElement('EXCLUSIVE_GATEWAY', 'Result?', x, y, paymentPoolId);
    elements.push(paymentResult.xml);
    flows.push(createBPMNFlow(validatePayment.id, paymentResult.id));
    
    x += 120;
    const paymentSuccess = createBPMNElement('END_EVENT', 'Success', x, y, paymentPoolId);
    elements.push(paymentSuccess.xml);
    flows.push(createBPMNFlow(paymentResult.id, paymentSuccess.id, 'Success'));
    flows.push(createBPMNFlow(paymentSuccess.id, orderComplete.id, '', 'MESSAGE'));
    
    const paymentError = createBPMNElement('ERROR_EVENT', 'Failed', x, y + 40, paymentPoolId);
    elements.push(paymentError.xml);
    flows.push(createBPMNFlow(paymentResult.id, paymentError.id, 'Failed'));
    
    // DATA ASSOCIATIONS
    flows.push(createBPMNFlow(loadCatalog.id, productsDB.id, '', 'ASSOCIATION'));
    flows.push(createBPMNFlow(createOrder.id, ordersDB.id, '', 'ASSOCIATION'));
    flows.push(createBPMNFlow(authenticate.id, usersDB.id, '', 'ASSOCIATION'));
    flows.push(createBPMNFlow(manageCart.id, cartDB.id, '', 'ASSOCIATION'));
    flows.push(createBPMNFlow(updateInventory.id, inventoryDB.id, '', 'ASSOCIATION'));
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" modified="2024-12-19T20:00:00.000Z" agent="5.0" etag="professional-horizontal-bpmn" version="24.7.17">
  <diagram name="TechnoSvit - Professional Horizontal BPMN" id="professional-horizontal-bpmn">
    <mxGraphModel dx="2074" dy="1406" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="827" math="0" shadow="0">
      <root>
${elements.join('\n')}
${flows.join('\n')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

// Generate the professional BPMN diagram
const professionalBPMN = generateProfessionalBPMN();

fs.writeFileSync('TechnoSvit_Professional_Horizontal_BPMN.drawio', professionalBPMN, 'utf8');

console.log('🎯 PROFESSIONAL HORIZONTAL BPMN 2.0 DIAGRAM GENERATED!');
console.log('📁 File: TechnoSvit_Professional_Horizontal_BPMN.drawio');
console.log('');
console.log('✅ PROPER BPMN 2.0 HORIZONTAL SWIMLANES:');
console.log('   🏊‍♂️ True horizontal pools and lanes');
console.log('   ➡️ Perfect left-to-right flow');
console.log('   📐 Professional BPMN 2.0 layout');
console.log('   🎨 Standard colors and symbols');
console.log('   🔄 Complete item purchase process');
console.log('   💳 External payment gateway pool');
console.log('   📊 Data layer with associations');
console.log('');
console.log('🎓 READY FOR ACADEMIC DEFENSE!');
