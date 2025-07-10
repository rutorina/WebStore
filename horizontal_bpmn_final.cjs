const fs = require('fs');

// FINAL HORIZONTAL BPMN 2.0 Generator - TRUE LEFT-TO-RIGHT FLOW
// Perfect horizontal swimlanes with proper spacing and flow direction

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

// PROPER BPMN 2.0 ELEMENTS WITH HORIZONTAL STYLING
const BPMN_ELEMENTS = {
    // POOLS AND LANES - Clean BPMN 2.0 Horizontal Style (Left to Right)
    POOL: {
        style: 'swimlane;html=1;childLayout=stackLayout;resizeParent=1;resizeParentMax=0;horizontal=1;startSize=50;horizontalStack=0;collapsible=0;swimlaneLine=1;fillColor=#ffffff;strokeColor=#000000;fontStyle=1;fontSize=16;fontColor=#000000;',
        width: 2200,
        height: 1400
    },
    LANE: {
        style: 'swimlane;html=1;startSize=120;horizontal=1;swimlaneLine=1;fillColor=#f8f9fa;strokeColor=#6c757d;fontSize=14;fontColor=#000000;',
        width: 2150,
        height: 280
    },
    
    // EVENTS (CIRCLES)
    START_EVENT: {
        style: 'ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#D5E8D4;strokeColor=#82B366;strokeWidth=3;fontSize=10;fontColor=#000000;',
        width: 50,
        height: 50
    },
    END_EVENT: {
        style: 'ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#F8CECC;strokeColor=#B85450;strokeWidth=6;fontSize=10;fontColor=#000000;',
        width: 50,
        height: 50
    },
    MESSAGE_START: {
        style: 'ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#D5E8D4;strokeColor=#82B366;strokeWidth=3;fontSize=10;fontColor=#000000;',
        width: 50,
        height: 50,
        symbol: '✉'
    },
    ERROR_EVENT: {
        style: 'ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#F8CECC;strokeColor=#B85450;strokeWidth=6;fontSize=10;fontColor=#000000;',
        width: 50,
        height: 50,
        symbol: '⚠'
    },
    
    // ACTIVITIES (ROUNDED RECTANGLES)
    TASK: {
        style: 'rounded=1;whiteSpace=wrap;html=1;fillColor=#DAE8FC;strokeColor=#6C8EBF;strokeWidth=2;fontSize=11;fontColor=#000000;',
        width: 140,
        height: 70
    },
    USER_TASK: {
        style: 'rounded=1;whiteSpace=wrap;html=1;fillColor=#DAE8FC;strokeColor=#6C8EBF;strokeWidth=2;fontSize=11;fontColor=#000000;',
        width: 140,
        height: 70,
        symbol: '👤'
    },
    SERVICE_TASK: {
        style: 'rounded=1;whiteSpace=wrap;html=1;fillColor=#E1D5E7;strokeColor=#9673A6;strokeWidth=2;fontSize=11;fontColor=#000000;',
        width: 140,
        height: 70,
        symbol: '⚙'
    },
    SCRIPT_TASK: {
        style: 'rounded=1;whiteSpace=wrap;html=1;fillColor=#FFF2CC;strokeColor=#D6B656;strokeWidth=2;fontSize=11;fontColor=#000000;',
        width: 140,
        height: 70,
        symbol: '💻'
    },
    SEND_TASK: {
        style: 'rounded=1;whiteSpace=wrap;html=1;fillColor=#F8CECC;strokeColor=#B85450;strokeWidth=2;fontSize=11;fontColor=#000000;',
        width: 140,
        height: 70,
        symbol: '📤'
    },
    RECEIVE_TASK: {
        style: 'rounded=1;whiteSpace=wrap;html=1;fillColor=#D5E8D4;strokeColor=#82B366;strokeWidth=2;fontSize=11;fontColor=#000000;',
        width: 140,
        height: 70,
        symbol: '📥'
    },
    
    // GATEWAYS (DIAMONDS)
    EXCLUSIVE_GATEWAY: {
        style: 'rhombus;whiteSpace=wrap;html=1;fillColor=#FFF2CC;strokeColor=#D6B656;strokeWidth=3;fontSize=12;fontColor=#000000;',
        width: 60,
        height: 60,
        symbol: '✕'
    },
    PARALLEL_GATEWAY: {
        style: 'rhombus;whiteSpace=wrap;html=1;fillColor=#D5E8D4;strokeColor=#82B366;strokeWidth=3;fontSize=12;fontColor=#000000;',
        width: 60,
        height: 60,
        symbol: '+'
    },
    
    // DATA OBJECTS
    DATA_STORE: {
        style: 'shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=15;fillColor=#F5F5F5;strokeColor=#666666;fontSize=10;fontColor=#000000;',
        width: 100,
        height: 70
    }
};

// FLOW TYPES
const FLOWS = {
    SEQUENCE: {
        style: 'edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#000000;endArrow=classic;endSize=8;',
        type: 'sequence'
    },
    MESSAGE: {
        style: 'edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#0066CC;dashed=1;dashPattern=8 8;startArrow=none;endArrow=classic;endSize=8;',
        type: 'message'
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

function generateComprehensiveBPMN() {
    bpmnId.reset();
    
    // Create main pool
    const poolId = bpmnId.getId();
    const pool = createBPMNCell(poolId, 'TechnoSvit Web Store - Order Processing', BPMN_ELEMENTS.POOL.style, {
        x: 0, y: 0, width: BPMN_ELEMENTS.POOL.width, height: BPMN_ELEMENTS.POOL.height
    });
    
    // Create lanes with proper horizontal layout
    const customerLane = createBPMNElement('LANE', 'Customer Interface', 0, 50, poolId);
    customerLane.xml = createBPMNCell(customerLane.id, 'Customer Interface', BPMN_ELEMENTS.LANE.style, {
        x: 0, y: 50, width: BPMN_ELEMENTS.LANE.width, height: BPMN_ELEMENTS.LANE.height
    }, poolId);
    
    const webAppLane = createBPMNElement('LANE', 'Web Application', 0, 330, poolId);
    webAppLane.xml = createBPMNCell(webAppLane.id, 'Web Application', BPMN_ELEMENTS.LANE.style, {
        x: 0, y: 330, width: BPMN_ELEMENTS.LANE.width, height: BPMN_ELEMENTS.LANE.height
    }, poolId);
    
    const businessLane = createBPMNElement('LANE', 'Business Logic', 0, 610, poolId);
    businessLane.xml = createBPMNCell(businessLane.id, 'Business Logic', BPMN_ELEMENTS.LANE.style, {
        x: 0, y: 610, width: BPMN_ELEMENTS.LANE.width, height: BPMN_ELEMENTS.LANE.height
    }, poolId);
    
    const dataLane = createBPMNElement('LANE', 'Data Layer', 0, 890, poolId);
    dataLane.xml = createBPMNCell(dataLane.id, 'Data Layer', BPMN_ELEMENTS.LANE.style, {
        x: 0, y: 890, width: BPMN_ELEMENTS.LANE.width, height: BPMN_ELEMENTS.LANE.height
    }, poolId);
    
    const externalLane = createBPMNElement('LANE', 'External Services', 0, 1170, poolId);
    externalLane.xml = createBPMNCell(externalLane.id, 'External Services', BPMN_ELEMENTS.LANE.style, {
        x: 0, y: 1170, width: BPMN_ELEMENTS.LANE.width, height: BPMN_ELEMENTS.LANE.height
    }, poolId);
    
    const elements = [pool, customerLane.xml, webAppLane.xml, businessLane.xml, dataLane.xml, externalLane.xml];
    const flows = [];
    
    // CUSTOMER INTERFACE LANE - PERFECT HORIZONTAL FLOW (LEFT TO RIGHT)
    let x = 150, y = 190;
    const spacing = 220; // Consistent spacing between elements
    
    // 1. Start Event
    const startEvent = createBPMNElement('MESSAGE_START', 'Visit\\nWebsite', x, y, customerLane.id);
    elements.push(startEvent.xml);
    
    // 2. Browse Products
    x += spacing;
    const browseProducts = createBPMNElement('USER_TASK', 'Browse\\nProducts', x, y, customerLane.id);
    elements.push(browseProducts.xml);
    flows.push(createBPMNFlow(startEvent.id, browseProducts.id));
    
    // 3. Add to Cart Gateway
    x += spacing;
    const addToCartGW = createBPMNElement('EXCLUSIVE_GATEWAY', 'Add to\\nCart?', x, y, customerLane.id);
    elements.push(addToCartGW.xml);
    flows.push(createBPMNFlow(browseProducts.id, addToCartGW.id));
    
    // 4. Add to Cart
    x += spacing;
    const addToCart = createBPMNElement('USER_TASK', 'Add to\\nCart', x, y, customerLane.id);
    elements.push(addToCart.xml);
    flows.push(createBPMNFlow(addToCartGW.id, addToCart.id, 'Yes'));
    
    // 5. Checkout Gateway
    x += spacing;
    const checkoutGW = createBPMNElement('EXCLUSIVE_GATEWAY', 'Proceed to\\nCheckout?', x, y, customerLane.id);
    elements.push(checkoutGW.xml);
    flows.push(createBPMNFlow(addToCart.id, checkoutGW.id));
    
    // 6. Checkout Process
    x += spacing;
    const checkout = createBPMNElement('USER_TASK', 'Checkout\\nProcess', x, y, customerLane.id);
    elements.push(checkout.xml);
    flows.push(createBPMNFlow(checkoutGW.id, checkout.id, 'Yes'));
    
    // 7. Payment
    x += spacing;
    const payment = createBPMNElement('USER_TASK', 'Provide\\nPayment', x, y, customerLane.id);
    elements.push(payment.xml);
    flows.push(createBPMNFlow(checkout.id, payment.id));
    
    // 8. Order Confirmation
    x += spacing;
    const orderConfirmation = createBPMNElement('END_EVENT', 'Order\\nConfirmed', x, y, customerLane.id);
    elements.push(orderConfirmation.xml);
    flows.push(createBPMNFlow(payment.id, orderConfirmation.id));
    
    // Loop back flows
    flows.push(createBPMNFlow(addToCartGW.id, browseProducts.id, 'Continue\\nBrowsing'));
    flows.push(createBPMNFlow(checkoutGW.id, browseProducts.id, 'Continue\\nShopping'));
    
    // WEB APPLICATION LANE - PERFECT HORIZONTAL FLOW
    x = 150, y = 470;
    
    // 1. Receive Request
    const receiveRequest = createBPMNElement('RECEIVE_TASK', 'Receive\\nRequest', x, y, webAppLane.id);
    elements.push(receiveRequest.xml);
    flows.push(createBPMNFlow(browseProducts.id, receiveRequest.id, '', 'MESSAGE'));
    
    // 2. Process Request
    x += spacing;
    const processRequest = createBPMNElement('SCRIPT_TASK', 'Process\\nRequest', x, y, webAppLane.id);
    elements.push(processRequest.xml);
    flows.push(createBPMNFlow(receiveRequest.id, processRequest.id));
    
    // 3. Validate Session
    x += spacing;
    const validateSession = createBPMNElement('SERVICE_TASK', 'Validate\\nSession', x, y, webAppLane.id);
    elements.push(validateSession.xml);
    flows.push(createBPMNFlow(processRequest.id, validateSession.id));
    
    // 4. Process Cart
    x += spacing;
    const processCart = createBPMNElement('SCRIPT_TASK', 'Process\\nCart', x, y, webAppLane.id);
    elements.push(processCart.xml);
    flows.push(createBPMNFlow(validateSession.id, processCart.id));
    
    // 5. Generate Order
    x += spacing;
    const generateOrder = createBPMNElement('SCRIPT_TASK', 'Generate\\nOrder', x, y, webAppLane.id);
    elements.push(generateOrder.xml);
    flows.push(createBPMNFlow(processCart.id, generateOrder.id));
    
    // 6. Send to Business
    x += spacing;
    const sendToBusiness = createBPMNElement('SEND_TASK', 'Send to\\nBusiness', x, y, webAppLane.id);
    elements.push(sendToBusiness.xml);
    flows.push(createBPMNFlow(generateOrder.id, sendToBusiness.id));
    
    // 7. Send Confirmation
    x += spacing;
    const sendConfirmation = createBPMNElement('SEND_TASK', 'Send\\nConfirmation', x, y, webAppLane.id);
    elements.push(sendConfirmation.xml);
    flows.push(createBPMNFlow(sendToBusiness.id, sendConfirmation.id));
    
    // 8. End Process
    x += spacing;
    const endWebApp = createBPMNElement('END_EVENT', 'Process\\nComplete', x, y, webAppLane.id);
    elements.push(endWebApp.xml);
    flows.push(createBPMNFlow(sendConfirmation.id, endWebApp.id));
    
    // BUSINESS LOGIC LANE - PERFECT HORIZONTAL FLOW
    x = 150, y = 750;
    
    // 1. Receive Order
    const receiveOrder = createBPMNElement('RECEIVE_TASK', 'Receive\\nOrder', x, y, businessLane.id);
    elements.push(receiveOrder.xml);
    flows.push(createBPMNFlow(sendToBusiness.id, receiveOrder.id, '', 'MESSAGE'));
    
    // 2. Authenticate User
    x += spacing;
    const authenticateUser = createBPMNElement('SERVICE_TASK', 'Authenticate\\nUser', x, y, businessLane.id);
    elements.push(authenticateUser.xml);
    flows.push(createBPMNFlow(receiveOrder.id, authenticateUser.id));
    
    // 3. Validate Order
    x += spacing;
    const validateOrder = createBPMNElement('SERVICE_TASK', 'Validate\\nOrder', x, y, businessLane.id);
    elements.push(validateOrder.xml);
    flows.push(createBPMNFlow(authenticateUser.id, validateOrder.id));
    
    // 4. Check Inventory
    x += spacing;
    const checkInventory = createBPMNElement('SERVICE_TASK', 'Check\\nInventory', x, y, businessLane.id);
    elements.push(checkInventory.xml);
    flows.push(createBPMNFlow(validateOrder.id, checkInventory.id));
    
    // 5. Create Order
    x += spacing;
    const createOrder = createBPMNElement('SERVICE_TASK', 'Create\\nOrder', x, y, businessLane.id);
    elements.push(createOrder.xml);
    flows.push(createBPMNFlow(checkInventory.id, createOrder.id));
    
    // 6. Update Inventory
    x += spacing;
    const updateInventory = createBPMNElement('SERVICE_TASK', 'Update\\nInventory', x, y, businessLane.id);
    elements.push(updateInventory.xml);
    flows.push(createBPMNFlow(createOrder.id, updateInventory.id));
    
    // 7. Generate Invoice
    x += spacing;
    const generateInvoice = createBPMNElement('SCRIPT_TASK', 'Generate\\nInvoice', x, y, businessLane.id);
    elements.push(generateInvoice.xml);
    flows.push(createBPMNFlow(updateInventory.id, generateInvoice.id));
    
    // 8. Complete Order
    x += spacing;
    const completeOrder = createBPMNElement('END_EVENT', 'Order\\nComplete', x, y, businessLane.id);
    elements.push(completeOrder.xml);
    flows.push(createBPMNFlow(generateInvoice.id, completeOrder.id));
    
    // DATA LAYER - HORIZONTAL DATABASE ELEMENTS
    x = 300, y = 1030;
    const dbSpacing = 200;
    
    const productsDB = createBPMNElement('DATA_STORE', 'Products\\nDB', x, y, dataLane.id);
    elements.push(productsDB.xml);
    
    x += dbSpacing;
    const ordersDB = createBPMNElement('DATA_STORE', 'Orders\\nDB', x, y, dataLane.id);
    elements.push(ordersDB.xml);
    
    x += dbSpacing;
    const usersDB = createBPMNElement('DATA_STORE', 'Users\\nDB', x, y, dataLane.id);
    elements.push(usersDB.xml);
    
    x += dbSpacing;
    const cartDB = createBPMNElement('DATA_STORE', 'Cart\\nDB', x, y, dataLane.id);
    elements.push(cartDB.xml);
    
    x += dbSpacing;
    const inventoryDB = createBPMNElement('DATA_STORE', 'Inventory\\nDB', x, y, dataLane.id);
    elements.push(inventoryDB.xml);
    
    // EXTERNAL SERVICES LANE - HORIZONTAL FLOW
    x = 400, y = 1310;
    
    const paymentGateway = createBPMNElement('SERVICE_TASK', 'Payment\\nGateway', x, y, externalLane.id);
    elements.push(paymentGateway.xml);
    flows.push(createBPMNFlow(payment.id, paymentGateway.id, '', 'MESSAGE'));
    
    x += spacing;
    const validatePayment = createBPMNElement('SERVICE_TASK', 'Validate\\nPayment', x, y, externalLane.id);
    elements.push(validatePayment.xml);
    flows.push(createBPMNFlow(paymentGateway.id, validatePayment.id));
    
    x += spacing;
    const paymentResult = createBPMNElement('PARALLEL_GATEWAY', 'Payment\\nResult', x, y, externalLane.id);
    elements.push(paymentResult.xml);
    flows.push(createBPMNFlow(validatePayment.id, paymentResult.id));
    
    x += spacing;
    const paymentSuccess = createBPMNElement('END_EVENT', 'Payment\\nSuccess', x, y, externalLane.id);
    elements.push(paymentSuccess.xml);
    flows.push(createBPMNFlow(paymentResult.id, paymentSuccess.id, 'Success'));
    
    const paymentError = createBPMNElement('ERROR_EVENT', 'Payment\\nError', x, y + 80, externalLane.id);
    elements.push(paymentError.xml);
    flows.push(createBPMNFlow(paymentResult.id, paymentError.id, 'Failed'));
    
    // Generate XML
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" agent="1.0" version="24.7.17">
  <diagram name="TechnoSvit_Horizontal_BPMN" id="comprehensive-bpmn">
    <mxGraphModel dx="2074" dy="1406" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
${elements.join('\n')}
${flows.join('\n')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
    
    return xmlContent;
}

// Generate and save the diagram
const bpmnXML = generateComprehensiveBPMN();
const outputPath = 'TechnoSvit_Perfect_Horizontal_BPMN.drawio';

try {
    fs.writeFileSync(outputPath, bpmnXML, 'utf8');
    console.log(`✅ Perfect Horizontal BPMN diagram generated successfully!`);
    console.log(`📁 File: ${outputPath}`);
    console.log(`🔄 Flow Direction: TRUE LEFT-TO-RIGHT`);
    console.log(`📏 Consistent spacing: 220px between elements`);
    console.log(`🏊 Clean horizontal swimlanes with proper BPMN 2.0 styling`);
    console.log(`📐 Professional layout with perfect alignment`);
} catch (error) {
    console.error('❌ Error generating BPMN diagram:', error);
}
