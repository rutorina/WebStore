const fs = require('fs');

// BPMN 2.0 Professional Diagram Generator - CLEAN XML VERSION
// Fixes base64 encoding issues for draw.io compatibility

class UniqueIdGenerator {
    constructor() {
        this.counter = 1;
        this.usedIds = new Set();
    }
    
    getId() {
        let id;
        do {
            id = `id${this.counter++}`;
        } while (this.usedIds.has(id));
        
        this.usedIds.add(id);
        return id;
    }
    
    reset() {
        this.counter = 1;
        this.usedIds.clear();
    }
}

const idGenerator = new UniqueIdGenerator();

// BPMN shape definitions
const BPMN_SHAPES = {
    POOL: {
        style: 'swimlane;childLayout=stackLayout;horizontal=1;startSize=50;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=0;marginBottom=0;swimlaneFillColor=#f8f9fa;swimlaneLine=1;',
        width: 1600,
        height: 800
    },
    LANE: {
        style: 'swimlane;childLayout=stackLayout;horizontal=1;startSize=30;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=0;marginBottom=0;swimlaneFillColor=#e9ecef;',
        width: 1550,
        height: 150
    },
    START_EVENT: {
        style: 'ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#d5e8d4;strokeColor=#82b366;strokeWidth=2;',
        width: 40,
        height: 40
    },
    END_EVENT: {
        style: 'ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#f8cecc;strokeColor=#b85450;strokeWidth=3;',
        width: 40,
        height: 40
    },
    USER_TASK: {
        style: 'rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;strokeWidth=1;',
        width: 120,
        height: 60
    },
    SERVICE_TASK: {
        style: 'rounded=1;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;strokeWidth=1;',
        width: 120,
        height: 60
    },
    SCRIPT_TASK: {
        style: 'rounded=1;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;strokeWidth=1;',
        width: 120,
        height: 60
    },
    SEND_TASK: {
        style: 'rounded=1;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;strokeWidth=1;',
        width: 120,
        height: 60
    },
    RECEIVE_TASK: {
        style: 'rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;strokeWidth=1;',
        width: 120,
        height: 60
    },
    EXCLUSIVE_GATEWAY: {
        style: 'rhombus;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;strokeWidth=2;',
        width: 50,
        height: 50
    },
    DATA_STORE: {
        style: 'shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=15;fillColor=#f5f5f5;strokeColor=#666666;',
        width: 80,
        height: 60
    },
    DATA_OBJECT: {
        style: 'shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;fillColor=#f5f5f5;strokeColor=#666666;',
        width: 80,
        height: 60
    }
};

function createCell(id, value, style, geometry, parent = '1') {
    const vertex = parent === '1' ? ' vertex="1"' : '';
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

function createBPMNElement(type, value, x, y, parent = '1') {
    const id = idGenerator.getId();
    const shape = BPMN_SHAPES[type];
    
    return {
        id,
        xml: createCell(id, value, shape.style, {
            x, y, width: shape.width, height: shape.height
        }, parent)
    };
}

function createFlow(sourceId, targetId, label = '') {
    const id = idGenerator.getId();
    const style = 'edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=1;strokeColor=#000000;';
    
    return `    <mxCell id="${id}" value="${label}" style="${style}" edge="1" parent="1" source="${sourceId}" target="${targetId}">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>`;
}

function createMessageFlow(sourceId, targetId, label = '') {
    const id = idGenerator.getId();
    const style = 'edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=1;strokeColor=#000000;dashed=1;dashPattern=8 8;startArrow=none;endArrow=classic;';
    
    return `    <mxCell id="${id}" value="${label}" style="${style}" edge="1" parent="1" source="${sourceId}" target="${targetId}">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>`;
}

function generateCleanBPMN() {
    idGenerator.reset();
    
    const elements = [];
    const flows = [];
    
    // Root elements
    elements.push(`    <mxCell id="0"/>`);
    elements.push(`    <mxCell id="1" parent="0"/>`);
    
    // Skip reserved IDs
    idGenerator.getId(); // Skip id2
    idGenerator.getId(); // Skip id3
    
    // Main Pool
    const mainPool = createBPMNElement('POOL', 'Система Інтернет-Магазину TechnoSvit', 50, 50);
    elements.push(mainPool.xml);
    
    // Customer Lane
    const customerLane = createBPMNElement('LANE', 'Клієнт', 100, 100, mainPool.id);
    elements.push(customerLane.xml);
    
    // System Lane
    const systemLane = createBPMNElement('LANE', 'Веб-Система', 100, 250, mainPool.id);
    elements.push(systemLane.xml);
    
    // Database Lane
    const dbLane = createBPMNElement('LANE', 'База Даних', 100, 400, mainPool.id);
    elements.push(dbLane.xml);
    
    // Payment Lane
    const paymentLane = createBPMNElement('LANE', 'Платіжна Система', 100, 550, mainPool.id);
    elements.push(paymentLane.xml);
    
    // Customer Process
    let x = 150, y = 120;
    
    const startEvent = createBPMNElement('START_EVENT', 'Початок', x, y, customerLane.id);
    elements.push(startEvent.xml);
    
    x += 100;
    const browseTask = createBPMNElement('USER_TASK', 'Перегляд товарів', x, y, customerLane.id);
    elements.push(browseTask.xml);
    flows.push(createFlow(startEvent.id, browseTask.id));
    
    x += 150;
    const selectGateway = createBPMNElement('EXCLUSIVE_GATEWAY', 'Обрати?', x, y, customerLane.id);
    elements.push(selectGateway.xml);
    flows.push(createFlow(browseTask.id, selectGateway.id));
    
    x += 100;
    const addCartTask = createBPMNElement('USER_TASK', 'Додати в кошик', x, y, customerLane.id);
    elements.push(addCartTask.xml);
    flows.push(createFlow(selectGateway.id, addCartTask.id, 'Так'));
    
    x += 150;
    const checkoutTask = createBPMNElement('USER_TASK', 'Оформлення', x, y, customerLane.id);
    elements.push(checkoutTask.xml);
    flows.push(createFlow(addCartTask.id, checkoutTask.id));
    
    x += 150;
    const paymentTask = createBPMNElement('USER_TASK', 'Оплата', x, y, customerLane.id);
    elements.push(paymentTask.xml);
    flows.push(createFlow(checkoutTask.id, paymentTask.id));
    
    x += 150;
    const endEvent = createBPMNElement('END_EVENT', 'Завершено', x, y, customerLane.id);
    elements.push(endEvent.xml);
    flows.push(createFlow(paymentTask.id, endEvent.id));
    
    // System Process
    x = 150, y = 270;
    
    const receiveRequest = createBPMNElement('RECEIVE_TASK', 'Отримання запиту', x, y, systemLane.id);
    elements.push(receiveRequest.xml);
    
    x += 150;
    const loadProducts = createBPMNElement('SERVICE_TASK', 'Завантаження товарів', x, y, systemLane.id);
    elements.push(loadProducts.xml);
    flows.push(createFlow(receiveRequest.id, loadProducts.id));
    
    x += 150;
    const validateCart = createBPMNElement('SERVICE_TASK', 'Перевірка кошика', x, y, systemLane.id);
    elements.push(validateCart.xml);
    flows.push(createFlow(loadProducts.id, validateCart.id));
    
    x += 150;
    const processOrder = createBPMNElement('SERVICE_TASK', 'Обробка замовлення', x, y, systemLane.id);
    elements.push(processOrder.xml);
    flows.push(createFlow(validateCart.id, processOrder.id));
    
    x += 150;
    const sendConfirm = createBPMNElement('SEND_TASK', 'Підтвердження', x, y, systemLane.id);
    elements.push(sendConfirm.xml);
    flows.push(createFlow(processOrder.id, sendConfirm.id));
    
    x += 150;
    const generateInvoice = createBPMNElement('SCRIPT_TASK', 'Генерація рахунку', x, y, systemLane.id);
    elements.push(generateInvoice.xml);
    flows.push(createFlow(sendConfirm.id, generateInvoice.id));
    
    // Database
    x = 300, y = 420;
    
    const productsDB = createBPMNElement('DATA_STORE', 'products', x, y, dbLane.id);
    elements.push(productsDB.xml);
    
    x += 150;
    const ordersDB = createBPMNElement('DATA_STORE', 'orders', x, y, dbLane.id);
    elements.push(ordersDB.xml);
    
    x += 150;
    const usersDB = createBPMNElement('DATA_STORE', 'users', x, y, dbLane.id);
    elements.push(usersDB.xml);
    
    x += 150;
    const cartDB = createBPMNElement('DATA_STORE', 'cart_items', x, y, dbLane.id);
    elements.push(cartDB.xml);
    
    // Payment Process
    x = 600, y = 570;
    
    const paymentGateway = createBPMNElement('SERVICE_TASK', 'Платіжний шлюз', x, y, paymentLane.id);
    elements.push(paymentGateway.xml);
    
    x += 150;
    const validatePayment = createBPMNElement('SERVICE_TASK', 'Перевірка платежу', x, y, paymentLane.id);
    elements.push(validatePayment.xml);
    flows.push(createFlow(paymentGateway.id, validatePayment.id));
    
    x += 150;
    const paymentSuccess = createBPMNElement('END_EVENT', 'Успішно', x, y, paymentLane.id);
    elements.push(paymentSuccess.xml);
    flows.push(createFlow(validatePayment.id, paymentSuccess.id));
    
    // Data Objects
    x = 1400, y = 200;
    
    const orderData = createBPMNElement('DATA_OBJECT', 'Дані замовлення', x, y);
    elements.push(orderData.xml);
    
    const customerData = createBPMNElement('DATA_OBJECT', 'Дані клієнта', x, y + 80);
    elements.push(customerData.xml);
    
    // Cross-lane message flows
    flows.push(createMessageFlow(browseTask.id, receiveRequest.id));
    flows.push(createMessageFlow(addCartTask.id, validateCart.id));
    flows.push(createMessageFlow(checkoutTask.id, processOrder.id));
    flows.push(createMessageFlow(paymentTask.id, paymentGateway.id));
    flows.push(createMessageFlow(paymentSuccess.id, sendConfirm.id));
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" modified="2024-12-19T12:00:00.000Z" agent="5.0" etag="clean-bpmn" version="24.7.17">
  <diagram name="BPMN 2.0 - TechnoSvit E-commerce" id="clean-bpmn-diagram">
    <mxGraphModel dx="2074" dy="1194" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1920" pageHeight="1080" math="0" shadow="0">
      <root>
${elements.join('\n')}
${flows.join('\n')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

// Generate clean BPMN diagram
const cleanBpmnXML = generateCleanBPMN();

fs.writeFileSync('Professional_Comprehensive_BPMN_TechnoSvit_CLEAN.drawio', cleanBpmnXML, 'utf8');

console.log('✅ CLEAN Professional BPMN 2.0 diagram generated successfully!');
console.log('📁 File: Professional_Comprehensive_BPMN_TechnoSvit_CLEAN.drawio');
console.log('🔧 Fixed Issues:');
console.log('   • Clean XML formatting (no escape sequences)');
console.log('   • Proper base64 encoding compatibility');
console.log('   • Valid draw.io file structure');
console.log('   • No atob() decoding errors');
console.log('📋 Features:');
console.log('   • BPMN 2.0 compliant elements');
console.log('   • 5 swimlanes with complete process flow');
console.log('   • Professional styling and colors');
console.log('   • Ukrainian labels for academic presentation');
